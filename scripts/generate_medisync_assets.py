"""Generate MediSync logo/cover placeholders for the portfolio."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"E:\Mina\Portfolio\src\assets\projects\medisync")
OUT.mkdir(parents=True, exist_ok=True)


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    path = (
        r"C:\Windows\Fonts\segoeuib.ttf"
        if bold
        else r"C:\Windows\Fonts\segoeui.ttf"
    )
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def draw_mark(d: ImageDraw.ImageDraw, cx: int, cy: int, scale: float = 1.0) -> None:
    bar_w = int(52 * scale)
    bar_h = int(180 * scale)
    d.rounded_rectangle(
        [cx - bar_w // 2, cy - bar_h // 2, cx + bar_w // 2, cy + bar_h // 2],
        radius=max(8, int(16 * scale)),
        fill=(103, 232, 249, 255),
    )
    d.rounded_rectangle(
        [cx - bar_h // 2, cy - bar_w // 2, cx + bar_h // 2, cy + bar_w // 2],
        radius=max(8, int(16 * scale)),
        fill=(103, 232, 249, 255),
    )
    r = int(28 * scale)
    d.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        fill=(14, 116, 144, 255),
        outline=(165, 243, 252, 255),
        width=max(2, int(3 * scale)),
    )
    arc_r = int(210 * scale)
    width = max(6, int(14 * scale))
    bbox = [cx - arc_r, cy - arc_r + int(20 * scale), cx + arc_r, cy + arc_r + int(20 * scale)]
    d.arc(bbox, start=40, end=140, fill=(56, 189, 248, 220), width=width)
    d.arc(bbox, start=220, end=320, fill=(56, 189, 248, 220), width=width)


def make_logo() -> Path:
    w = h = 1254
    img = Image.new("RGBA", (w, h), (8, 14, 24, 255))
    d = ImageDraw.Draw(img)
    for i, alpha in ((520, 40), (420, 55), (320, 70)):
        d.ellipse(
            [(w // 2 - i, h // 2 - i), (w // 2 + i, h // 2 + i)],
            outline=(56, 189, 248, alpha),
            width=3,
        )
    pad = 180
    d.rounded_rectangle(
        [pad, pad, w - pad, h - pad],
        radius=96,
        fill=(12, 28, 48, 255),
        outline=(34, 211, 238, 180),
        width=4,
    )
    d.rounded_rectangle(
        [pad + 28, pad + 28, w - pad - 28, h - pad - 28],
        radius=80,
        fill=(15, 40, 68, 255),
    )
    draw_mark(d, w // 2, h // 2 - 70, 1.0)
    title = "MediSync"
    f_title = font(92, bold=True)
    f_sub = font(36)
    tw = d.textlength(title, font=f_title)
    d.text(((w - tw) / 2, h // 2 + 180), title, font=f_title, fill=(236, 254, 255, 255))
    sub = "AI Radiology Platform"
    sw = d.textlength(sub, font=f_sub)
    d.text(((w - sw) / 2, h // 2 + 290), sub, font=f_sub, fill=(125, 211, 252, 230))
    path = OUT / "logo.png"
    img.save(path, "PNG")
    return path


def make_cover() -> Path:
    w, h = 1536, 1024
    cover = Image.new("RGBA", (w, h), (6, 12, 22, 255))
    d = ImageDraw.Draw(cover)
    for y in range(h):
        t = y / h
        d.line(
            [(0, y), (w, y)],
            fill=(int(8 + t * 10), int(18 + t * 28), int(36 + t * 40), 255),
        )
    d.ellipse([w - 700, -200, w + 100, 700], fill=(14, 116, 144, 70))
    d.ellipse([-200, h - 500, 600, h + 200], fill=(8, 47, 73, 90))
    d.rounded_rectangle(
        [64, 64, w - 64, h - 64],
        radius=40,
        outline=(34, 211, 238, 120),
        width=3,
    )
    draw_mark(d, 320, h // 2, 0.78)
    f_title = font(86, bold=True)
    f_sub = font(34)
    d.text((520, h // 2 - 90), "MediSync", font=f_title, fill=(236, 254, 255, 255))
    d.text(
        (520, h // 2 + 10),
        "AI-assisted radiology workspace",
        font=f_sub,
        fill=(125, 211, 252, 230),
    )
    d.text(
        (520, h // 2 + 70),
        "Drafts for radiologist review — not a signed report",
        font=f_sub,
        fill=(148, 163, 184, 220),
    )
    path = OUT / "cover.png"
    cover.save(path, "PNG")
    return path


if __name__ == "__main__":
    print(make_logo())
    print(make_cover())
