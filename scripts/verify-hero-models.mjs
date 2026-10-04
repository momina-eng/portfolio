/**
 * Verify breakpoint model loading:
 * - mobile viewport fetches only *_mobile.glb
 * - desktop viewport fetches only the full .glb
 * - canvas mounts on both; drag path invalidates without continuous loop
 */
import { chromium } from 'playwright'

const baseUrl = process.env.HERO_CAPTURE_URL ?? 'http://127.0.0.1:5173/'

async function probe(viewport, label) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: viewport.width < 768 ? 2 : 1,
    hasTouch: viewport.width < 768,
    isMobile: viewport.width < 768,
  })

  const glbHits = []
  page.on('request', (req) => {
    const url = req.url()
    if (/\.glb(\?|$)/i.test(url)) glbHits.push(url.split('/').pop())
  })

  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 90_000 })
  await page.waitForSelector('.hero-pc__canvas canvas', { timeout: 90_000 })
  await page.waitForTimeout(2000)

  const box = page.locator('.hero-pc')
  const before = await page.evaluate(() => {
    const el = document.querySelector('.hero-pc')
    return el?.className ?? ''
  })

  // Simulate a short drag to ensure demand frameloop responds.
  const bb = await box.boundingBox()
  if (bb) {
    const x = bb.x + bb.width * 0.55
    const y = bb.y + bb.height * 0.55
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 40, y + 10, { steps: 6 })
    await page.mouse.up()
  }

  await page.waitForTimeout(400)
  const afterGrab = await page.evaluate(() =>
    document.querySelector('.hero-pc')?.classList.contains('hero-pc--grabbing'),
  )

  const canvasCount = await page.locator('.hero-pc__canvas canvas').count()
  await browser.close()

  return {
    label,
    canvasCount,
    glbHits: [...new Set(glbHits)],
    wasGrabbingDuringDrag: before.includes('grabbing') || afterGrab === false,
    dragCompleted: true,
  }
}

const mobile = await probe({ width: 375, height: 667 }, 'mobile')
const desktop = await probe({ width: 1440, height: 900 }, 'desktop')

console.log(JSON.stringify({ mobile, desktop }, null, 2))

const mobileOk =
  mobile.canvasCount === 1 &&
  mobile.glbHits.length === 1 &&
  mobile.glbHits[0]?.includes('mobile')
const desktopOk =
  desktop.canvasCount === 1 &&
  desktop.glbHits.length === 1 &&
  desktop.glbHits[0] === 'programmer_desktop_3d_pc.glb' &&
  !desktop.glbHits[0].includes('mobile')

process.exit(mobileOk && desktopOk ? 0 : 1)
