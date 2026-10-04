import type { ProjectCaseStudy } from './types'

import vulnCover from '@/assets/projects/vuln-agent/cover.png'
import vulnDemo from '@/assets/projects/vuln-agent/demo.mp4'
import vulnDemoUi from '@/assets/projects/vuln-agent/demo-ui.png'
import vulnAnalysis from '@/assets/projects/vuln-agent/analysis.png'
import vulnPipeline from '@/assets/projects/vuln-agent/pipeline.png'
import vulnKnowledge from '@/assets/projects/vuln-agent/knowledge.png'
import vulnArchitecture from '@/assets/projects/vuln-agent/architecture.png'
import vulnFeatures from '@/assets/projects/vuln-agent/features.png'
import vulnAbout from '@/assets/projects/vuln-agent/about.png'
import vulnCta from '@/assets/projects/vuln-agent/cta.png'

import newsCover from '@/assets/projects/newssense/cover.png'
import newsSearch from '@/assets/projects/newssense/search-interface.png'
import newsActiveSearch from '@/assets/projects/newssense/active-search.png'
import newsResults from '@/assets/projects/newssense/results.png'
import newsLanguage from '@/assets/projects/newssense/language.png'
import newsBilingual from '@/assets/projects/newssense/bilingual-results.png'
import newsUrdu from '@/assets/projects/newssense/urdu-results.png'
import newsPagination from '@/assets/projects/newssense/results-pagination.png'
import newsNavigation from '@/assets/projects/newssense/results-navigation.png'
import newsFooter from '@/assets/projects/newssense/footer.png'

import voiceCover from '@/assets/projects/voicex/cover.png'
import voiceLogin from '@/assets/projects/voicex/login.png'
import voiceReg from '@/assets/projects/voicex/reg.png'
import voiceOtp from '@/assets/projects/voicex/otp.png'
import voiceComplaint from '@/assets/projects/voicex/complaint.png'
import voiceTracking from '@/assets/projects/voicex/tracking.png'
import voiceAdmin from '@/assets/projects/voicex/admin.png'
import voiceManage from '@/assets/projects/voicex/manage-complaints.png'
import voiceDetails from '@/assets/projects/voicex/complaint-details.png'
import voiceResolution from '@/assets/projects/voicex/resolution-mail.png'
import voiceFeedback from '@/assets/projects/voicex/feedback.png'
import voiceThankYou from '@/assets/projects/voicex/thank-you.png'

import mediCover from '@/assets/projects/mediflow/cover.png'
import mediHome1 from '@/assets/projects/mediflow/home-1.png'
import mediHome2 from '@/assets/projects/mediflow/home-2.png'
import mediHome3 from '@/assets/projects/mediflow/home-3.png'
import mediHome4 from '@/assets/projects/mediflow/home-4.png'
import mediDoctor from '@/assets/projects/mediflow/doctor-dashboard.png'
import mediPatient from '@/assets/projects/mediflow/patient-dashboard.png'
import mediDoctorForm from '@/assets/projects/mediflow/doctor-form.png'
import mediPatientForm from '@/assets/projects/mediflow/patient-form.png'
import mediPatientView from '@/assets/projects/mediflow/patient-view.png'
import mediTable from '@/assets/projects/mediflow/table.png'

/**
 * Case-study content keyed by project slug.
 * Substance preserved from E:/Portfolio case studies with Mina asset paths.
 * MediSync grounded in the current MediSync repository audit / developer specification.
 */
export const caseStudies: Record<string, ProjectCaseStudy> = {
  medisync: {
    category: 'AI Engineering · Medical Imaging',
    role: 'AI Engineer',
    team: 'Internship Engineering Project',
    duration: 'July 2026 – September 2026',
    heroDescription:
      'MediSync is a multi-agent AI radiology assistance platform—an AI-assisted radiology workspace that drafts structured reports for radiologist review. MediSync drafts. The radiologist signs.',
    overview:
      'MediSync helps radiologists move from DICOM upload to a structured Findings / Impression / Recommendations draft without treating AI output as a signed report or medical device. The system combines mixture-of-experts MONAI imaging models, longitudinal patient memory, evidence-grounded guideline retrieval, and a mandatory human interrupt before anything is persisted as final.',
    problem:
      'Radiology reporting is slow and inconsistent, and a single generic model is a poor fit across CT chest, abdominal CT, MRI brain, and cardiac MRI. An assistant that invents findings—or that auto-commits a report—is clinically unsafe.',
    solution:
      'A FastAPI gateway fronts a LangGraph supervisor with a Postgres checkpointer. After memory read and expert routing, image analysis, clinical-context synthesis, and RAG fan out in parallel. Verification annotates imaging findings without inventing them. The report generator builds a versioned template first, optionally phrases with MedGemma under fabrication checks, then interrupts for radiologist approve, edit, or reject. Missing review decisions fail closed as rejection—never auto-approve.',
    outcome:
      'Production-validated paths reach awaiting_review for live CT+Chest, CT+Abdomen, and MRI+Head keep-combos, with draft disclaimers in the UI and fail-closed routing at both the New Case form and the case API for unsupported modality–region pairs.',
    workflow: [
      {
        id: 'patient-case',
        title: 'Patient & Case Intake',
        description:
          'Radiologist ensures a patient record, uploads a DICOM study to MinIO, and creates a case through the FastAPI gateway.',
      },
      {
        id: 'read-memory',
        title: 'Read Longitudinal Memory',
        description:
          'The graph loads documented patient history before imaging analysis so clinical context stays grounded in prior records.',
      },
      {
        id: 'route-expert',
        title: 'Route Imaging Expert',
        description:
          'Exact modality × body-region matching selects a MONAI expert. Unmatched combinations raise RoutingError and HTTP 400—no silent fallback to the wrong model.',
      },
      {
        id: 'parallel-experts',
        title: 'Parallel Expert Branches',
        description:
          'Image Expert (MONAI), Clinical Context (LLM or rules), and RAG (Qdrant ± LLM summary) run concurrently and write disjoint state keys.',
      },
      {
        id: 'verify',
        title: 'Verification Join',
        description:
          'Every output finding is copied from Image Expert. The node only attaches citations, contradiction flags, and confidence—never invents findings.',
      },
      {
        id: 'generate-report',
        title: 'Generate Draft Report',
        description:
          'A versioned template builds Findings / Impression / Recommendations first. MedGemma phrasing is kept only when complete and free of fabrication.',
      },
      {
        id: 'human-review',
        title: 'Radiologist Review Interrupt',
        description:
          'LangGraph pauses before human_review. Approve or edit writes memory; reject closes with no final report. Unknown decisions are treated as rejection.',
      },
    ],
    features: [
      {
        id: 'mixture-of-experts',
        title: 'Mixture-of-Experts Imaging',
        description:
          'Region-specific MONAI Zoo bundles for CT chest nodule detection, CT abdomen organ segmentation, MRI brain BraTS subregions, and cardiac short-axis labels—not one catch-all network.',
      },
      {
        id: 'human-in-the-loop',
        title: 'Mandatory Human-in-the-Loop',
        description:
          'The workflow interrupts before a signed report exists. Draft UI copy states the output is for radiologist review, not a final signed report.',
      },
      {
        id: 'evidence-grounding',
        title: 'Evidence-Grounded Guidelines',
        description:
          'PubMedBERT embeddings retrieve paraphrased clinical guidelines from Qdrant; reports may cite only retrieved citation IDs.',
      },
      {
        id: 'longitudinal-memory',
        title: 'Longitudinal Memory',
        description:
          'History is read before analysis; a final report is written to memory only after approve or edit—never on reject or missing decisions.',
      },
      {
        id: 'fail-closed-routing',
        title: 'Fail-Closed Capability Gating',
        description:
          'UI and API share supported_capabilities.json. Unsupported modality–region pairs are rejected with HTTP 400 instead of stubbing NotImplementedError into 500s.',
      },
      {
        id: 'medgemma-guardrails',
        title: 'MedGemma with Clinical Guardrails',
        description:
          'Language call sites share call_llm() with MedGemma locally via Ollama. Prompt hardening and strip_false_absence_claims() block false “no symptoms” narratives when fields are present.',
      },
      {
        id: 'template-safe-reports',
        title: 'Template-Safe Report Generation',
        description:
          'If LLM phrasing fails completeness or exact-phrase fabrication checks, the system keeps the deterministic template—safer than an ungrounded draft.',
      },
      {
        id: 'role-based-workspace',
        title: 'Radiologist & Admin Roles',
        description:
          'JWT roles separate radiologist case workflows from admin dead-letter / retry operations. There is no referring-physician login role.',
      },
    ],
    techGroups: [
      {
        id: 'frontend',
        label: 'Presentation',
        items: ['React', 'TypeScript', 'Vite', 'Vitest'],
      },
      {
        id: 'api',
        label: 'API & Auth',
        items: ['Python', 'FastAPI', 'PyJWT', 'Pydantic Settings', 'Uvicorn'],
      },
      {
        id: 'orchestration',
        label: 'Orchestration',
        items: ['LangGraph', 'Postgres Checkpointer'],
      },
      {
        id: 'vision-ai',
        label: 'Imaging & Language',
        items: ['MONAI', 'MedGemma', 'Ollama', 'PubMedBERT'],
      },
      {
        id: 'storage',
        label: 'Storage & Retrieval',
        items: ['PostgreSQL', 'MinIO', 'Qdrant'],
      },
      {
        id: 'delivery',
        label: 'Delivery',
        items: ['Docker Compose', 'Pytest', 'Vitest'],
      },
    ],
    techHighlights: [
      {
        id: 'live-ct-chest',
        label: 'Live Study: CT · Chest',
        detail:
          'lung_nodule_ct_detection (RetinaNet / LUNA16) returns pulmonary nodule candidates—not pneumonia, effusion, or fibrosis classifiers.',
      },
      {
        id: 'live-ct-abdomen',
        label: 'Live Study: CT · Abdomen',
        detail:
          'swin_unetr_btcv_segmentation covers 13 BTCV organs. Organ coverage is not a pathology diagnosis and does not include pelvis.',
      },
      {
        id: 'live-mri-head',
        label: 'Live Study: MRI · Head',
        detail:
          'brats_mri_segmentation requires a four-series ZIP (T1ce, T1, T2, FLAIR) and reports BraTS tumor subregions—not a general neuro read.',
      },
      {
        id: 'live-mri-heart',
        label: 'Live Study: MRI · Heart',
        detail:
          'ventricular_short_axis_3label labels LV/RV cavity and myocardium on short-axis MRI. CT cardiac is modality-incompatible.',
      },
      {
        id: 'safety-positioning',
        label: 'Safety Positioning',
        detail:
          'Product language is explicit: AI-generated draft for radiologist review; not a final signed report; not a medical-device output.',
      },
      {
        id: 'llm-validation',
        label: 'LLM Validation Harness',
        detail:
          'Repeated-run jailbreak and false-absence gates validated MedGemma migration across clinical context, RAG, verify, and report agents—with remaining caveats documented rather than hidden.',
      },
    ],
    architecture: {
      title: 'System Architecture',
      subtitle:
        'Presentation → FastAPI gateway → LangGraph supervisor → tools & stores. Agents never open databases directly.',
      summary:
        'Radiologists and admins use the React workspace over cookie JWT APIs. FastAPI validates requests and starts cases only after resolve_expert() succeeds. LangGraph coordinates memory, routing, parallel expert branches, verification, report generation, and a human_review interrupt backed by a Postgres checkpointer. PostgreSQL stores patients, cases, reports, timeline, and DLQ; MinIO holds DICOM uploads and artifacts; Qdrant stores 768-d clinical guideline chunks.',
      points: [
        'Presentation — React radiologist / admin workspace',
        'API — FastAPI auth, validation, and case lifecycle',
        'Orchestration — LangGraph supervisor with Postgres checkpoints',
        'Agents — Memory, Router, Image Expert, Clinical Context, RAG, Verify, Report, Rejection',
        'Tools — DICOM load, embeddings, search, and storage adapters',
        'Stores — PostgreSQL, MinIO (dicom-uploads / image-artifacts), Qdrant clinical_guidelines',
        'LLM — shared call_llm() for clinical context, RAG summary, verify overlay, and report phrasing',
        'Vision — MONAI Image Expert path with no LLM in the imaging branch',
      ],
    },
    challenges: [
      {
        id: 'false-absence',
        title: 'False-absence clinical narratives',
        description:
          'limited_data flags could be correct while prose still claimed “no symptoms or labs are provided.” Prompt hardening plus strip_false_absence_claims() closed the gap across LLM call sites.',
      },
      {
        id: 'unsafe-routing',
        title: 'Unsafe unmatched study routing',
        description:
          'UI hiding was not enough—direct API callers could still create unsupported cases. Exact-match routing, pre-create resolve_expert(), and integration tests now fail closed with HTTP 400.',
      },
      {
        id: 'fabrication-checks',
        title: 'Exact-phrase fabrication checks',
        description:
          'Report LLM drafts often fall back to templates when casing or phrasing drifts from verified finding strings—accepted as safer than shipping an ungrounded narrative.',
      },
    ],
    learnings: [
      {
        id: 'fail-closed',
        title: 'Fail closed by default',
        description:
          'Unsupported studies, fatal imaging errors, and missing review decisions should stop the workflow—not invent a confident answer.',
      },
      {
        id: 'centralize-llm',
        title: 'Centralize LLM access',
        description:
          'A single call_llm() boundary made the MedGemma migration a model + prompt + guardrail change instead of four divergent clients.',
      },
      {
        id: 'honest-limits',
        title: 'Document model limits',
        description:
          'Nodule detection is not a full chest read; organ segmentation is not pathology diagnosis. Clear capability boundaries are part of clinical safety.',
      },
    ],
    results: [
      {
        id: 'human-gated-path',
        label: 'End-to-end LangGraph path with human interrupt',
        value: '✓',
      },
      {
        id: 'live-studies',
        label: 'Four live MONAI study types in the capability matrix',
        value: '✓',
      },
      {
        id: 'fail-closed-api',
        label: 'Fail-closed routing at UI and API',
        value: '✓',
      },
      {
        id: 'medgemma-ship',
        label: 'MedGemma on four language sites with template/rule fallbacks',
        value: '✓',
      },
      {
        id: 'keep-combos',
        label: 'CT Chest, CT Abdomen, MRI Head keep-combos reach radiologist review',
        value: '✓',
      },
    ],
    nextSteps: null,
    nextVersion: [
      'Additional live modality–region pairs beyond the current MONAI keep-combos',
      'GPU-served language inference in Compose (today: host Ollama)',
      'Stronger verify warning hygiene so jailbreak phrasing cannot echo in warnings',
      'Richer report phrasing that still passes exact-phrase grounding checks',
      'Expanded guideline corpus and citation UX in the review panel',
    ],
  },

  'vuln-agent': {
    category: 'AI Engineering · Cybersecurity',
    role: 'Full-Stack AI Engineer',
    team: 'Solo Developer',
    heroDescription:
      'VulnAgent is an AI-assisted source-code security system that analyzes vulnerable code, identifies security issues, retrieves relevant remediation patterns, generates patches with Gemini, and validates the resulting fixes through an iterative workflow.',
    overview:
      'VulnAgent addresses the gap between vulnerability discovery and practical remediation. Instead of stopping at findings, it organizes source-code analysis, classification, remediation retrieval, Gemini-assisted patch generation, and validation into a structured AI-assisted security workflow that engineers can inspect and review.',
    problem:
      'Source-code vulnerabilities often require manual identification, remediation research, patch implementation, and verification. Static analysis may surface issues, but turning those findings into validated remediations still demands significant engineering effort and careful review.',
    solution:
      'VulnAgent combines vulnerability analysis, classification with CWE and severity context, remediation knowledge retrieval, Gemini-powered patch generation, deterministic validation, and iterative retries into a modular processing pipeline exposed through a FastAPI backend and React interface.',
    outcome:
      'The resulting workflow provides a structured path from vulnerability identification to AI-assisted remediation and validation, producing inspectable patch candidates for engineering review rather than treating AI output as automatically trusted.',
    workflow: [
      {
        id: 'source-code',
        title: 'Source Code',
        description:
          'Accepts source input for analysis and initializes shared run context for the workflow.',
      },
      {
        id: 'scanner',
        title: 'Scanner / Analysis',
        description:
          'Performs initial source-code scanning to surface candidate insecure constructs.',
      },
      {
        id: 'detector',
        title: 'Vulnerability Detection',
        description:
          'Confirms findings and structures each detected issue for downstream remediation stages.',
      },
      {
        id: 'classification',
        title: 'Classification + CWE / Severity',
        description:
          'Maps confirmed issues to vulnerability type, CWE classification, and severity to guide remediation.',
      },
      {
        id: 'knowledge-retriever',
        title: 'Remediation Retrieval',
        description:
          'Retrieves relevant secure patterns and remediation guidance before patch generation.',
      },
      {
        id: 'gemini-patch-generator',
        title: 'Gemini Patch Generation',
        description:
          'Uses Google Gemini with retrieved context and structured prompting to draft remediation patches.',
      },
      {
        id: 'validator',
        title: 'Validation',
        description:
          'Evaluates generated patches against deterministic validation rules instead of accepting them blindly.',
      },
      {
        id: 'retry',
        title: 'Retry if Needed',
        description:
          'When validation fails, the orchestrator can trigger another patch-generation attempt within bounded retries.',
      },
      {
        id: 'final-secure-code',
        title: 'Validated Patch / Result',
        description:
          'Returns validated patch results and run context for engineering inspection and adoption.',
      },
    ],
    features: [
      {
        id: 'ai-patch-generation',
        title: 'AI-Assisted Patch Generation',
        description:
          'Gemini generates remediation patches within a structured security workflow, using retrieved context rather than unconstrained free-form generation.',
      },
      {
        id: 'vulnerability-classification',
        title: 'Vulnerability Classification',
        description:
          'Detected issues are categorized with vulnerability type, CWE, and severity to structure the remediation path.',
      },
      {
        id: 'knowledge-remediation',
        title: 'Remediation Retrieval',
        description:
          'Relevant secure patterns are retrieved before patch generation so AI drafts are grounded in known remediation guidance.',
      },
      {
        id: 'automated-validation',
        title: 'Patch Validation',
        description:
          'Generated fixes are evaluated against validation rules rather than blindly accepted.',
      },
      {
        id: 'iterative-retry',
        title: 'Iterative Retry',
        description:
          'Failed validation can trigger another patch-generation attempt through the orchestrated retry loop.',
      },
      {
        id: 'multi-vulnerability',
        title: 'Multi-Vulnerability Processing',
        description:
          'The workflow can handle multiple detected vulnerabilities in a single analysis pass instead of assuming only one issue.',
      },
      {
        id: 'modular-agents',
        title: 'Modular Pipeline Architecture',
        description:
          'Scanner, detector, retriever, generator, validator, and orchestrator remain separate stages with clear responsibilities.',
      },
      {
        id: 'execution-tracking',
        title: 'Shared Execution Context',
        description:
          'Source, findings, retrieved guidance, drafts, and validation outcomes stay linked for inspectable runs.',
      },
    ],
    demo: {
      title: 'Live Product Demonstration',
      subtitle:
        'Watch VulnAgent analyze vulnerable source code, detect security issues, generate AI-assisted patches, validate the fixes, and return results through the remediation pipeline.',
      src: vulnDemo,
      poster: vulnCover,
    },
    techGroups: [
      {
        id: 'frontend',
        label: 'Frontend',
        items: ['React', 'Vite', 'React Router'],
      },
      {
        id: 'backend',
        label: 'Backend',
        items: ['Python', 'FastAPI', 'REST APIs'],
      },
      {
        id: 'ai',
        label: 'AI & Remediation',
        items: [
          'Google Gemini',
          'Structured Prompting',
          'Knowledge-Based Retrieval',
          'Validation Loop',
        ],
      },
      {
        id: 'developer-tools',
        label: 'Developer Tools',
        items: ['Rich CLI', 'Git', 'GitHub'],
      },
    ],
    techHighlights: [
      {
        id: 'supported-buffer-overflow',
        label: 'Supported Vulnerability: Buffer Overflow',
        detail:
          'Detects unsafe buffer-handling patterns such as gets(), strcpy(), and strcat(), then retrieves secure alternatives and validates generated patches before returning remediations.',
      },
      {
        id: 'supported-code-injection',
        label: 'Supported Vulnerability: Code Injection',
        detail:
          'Flags unsafe dynamic evaluation patterns such as eval() and routes findings through knowledge retrieval, Gemini patch generation, and rule-based validation.',
      },
      {
        id: 'supported-command-execution',
        label: 'Supported Vulnerability: Command Execution',
        detail:
          'Detects unsafe process execution patterns such as exec() and produces reviewable secure replacements through the multi-stage remediation pipeline.',
      },
      {
        id: 'supported-command-injection',
        label: 'Supported Vulnerability: Command Injection',
        detail:
          'Identifies unsafe runtime command invocation patterns such as Runtime.getRuntime().exec() and applies knowledge-grounded patch generation with validation.',
      },
      {
        id: 'supported-hardcoded-credentials',
        label: 'Supported Vulnerabilities: Hardcoded Credentials, Secrets & API Keys',
        detail:
          'Detects hardcoded credentials, secrets, and API keys within source input. Multiple vulnerability findings can be processed in a single scan.',
      },
      {
        id: 'ai-pipeline-gemini',
        label: 'AI Workflow: Gemini Patch Generation',
        detail:
          'Gemini is integrated as the patch-generation stage inside a structured pipeline. Findings and retrieved remediation guidance are injected into prompting so generation remains grounded rather than unconstrained.',
      },
      {
        id: 'ai-pipeline-validation-loop',
        label: 'AI Workflow: Validation & Iterative Retry',
        detail:
          'Generated patches enter a deterministic validation loop. Failed validations can trigger bounded retries so the orchestrator revises drafts while preserving rule-based safety checks.',
      },
      {
        id: 'ai-pipeline-retrieval',
        label: 'AI Workflow: Retrieval + Generation',
        detail:
          'Remediation knowledge is retrieved before generation. The system pairs retrieval with Gemini rather than relying on the model alone to invent every secure fix.',
      },
    ],
    gallery: [
      {
        id: 'landing-interface',
        src: vulnCover,
        alt: 'VulnAgent landing interface',
        caption:
          'Landing Interface — product hero with pipeline visualization from scanner to patched code.',
      },
      {
        id: 'interactive-demo',
        src: vulnDemoUi,
        alt: 'VulnAgent interactive demo',
        caption:
          'Interactive Demo — paste vulnerable source and run analysis through the FastAPI pipeline.',
      },
      {
        id: 'analysis-results',
        src: vulnAnalysis,
        alt: 'VulnAgent analysis and patch results',
        caption:
          'Analysis Results — detection summary, terminal logs, and validated patch review controls.',
      },
      {
        id: 'pipeline-overview',
        src: vulnPipeline,
        alt: 'VulnAgent analysis pipeline stages',
        caption:
          'Pipeline Overview — source intake through scanning, detection, retrieval, Gemini patching, and validation.',
      },
      {
        id: 'knowledge-base-stage',
        src: vulnKnowledge,
        alt: 'VulnAgent knowledge base pipeline stage',
        caption:
          'Knowledge Base Stage — retrieves trusted secure patterns for each confirmed finding.',
      },
      {
        id: 'architecture-capabilities',
        src: vulnArchitecture,
        alt: 'VulnAgent architecture and capabilities',
        caption:
          'Architecture & Capabilities — modular pipeline, shared execution context, and bounded retry logic.',
      },
      {
        id: 'feature-grid',
        src: vulnFeatures,
        alt: 'VulnAgent feature cards',
        caption:
          'Core Capabilities — detection, classification, remediation retrieval, patch generation, and validation.',
      },
      {
        id: 'about-mission',
        src: vulnAbout,
        alt: 'VulnAgent about and mission section',
        caption:
          'Mission — AI proposes remediations, validation checks them, and engineers remain in control.',
      },
      {
        id: 'product-cta',
        src: vulnCta,
        alt: 'VulnAgent call to action and product footer',
        caption:
          'Product Footer — Gemini-assisted remediation with a React frontend and Python backend.',
      },
    ],
    architecture: {
      title: 'System Architecture',
      subtitle:
        'Modular stages coordinated through shared execution context and an API layer.',
      summary:
        'VulnAgent follows a modular pipeline architecture. The Scanner identifies candidate insecure patterns, the Detector confirms findings and classification context, the Retriever supplies remediation guidance, the Patch Generator drafts fixes with Google Gemini, and the Validator enforces deterministic checks. The Orchestrator coordinates stage execution and retries through a shared Execution Context, while the FastAPI layer and React frontend expose the workflow for interactive and programmatic use.',
      points: [
        'Scanner — initial source-code scanning and analysis',
        'Detector — vulnerability detection and classification (type, CWE, severity)',
        'Knowledge Base / Retriever — remediation pattern retrieval',
        'Patch Generator — Gemini-assisted remediation drafts',
        'Validator — deterministic patch validation',
        'Orchestrator — workflow coordination and retry control',
        'Shared Context / Execution Trace — linked run state across stages',
        'Multi-vulnerability handling — multiple findings in one pass',
        'API Layer — FastAPI REST services',
        'Frontend — React interactive review UI',
      ],
    },
    challenges: [
      {
        id: 'reliable-ai-patches',
        title: 'Reliable AI-Generated Patches',
        description:
          'AI-generated code cannot simply be accepted without validation. The system needed a clear handoff from Gemini drafts to deterministic checks before results reached engineers.',
      },
      {
        id: 'workflow-context',
        title: 'Maintaining Workflow Context',
        description:
          'Detection, retrieval, generation, and validation each need consistent vulnerability and remediation information. Shared execution context keeps those stages aligned.',
      },
      {
        id: 'multi-finding-execution',
        title: 'Handling Multiple Vulnerabilities',
        description:
          'The workflow must avoid treating source code as if it can contain only one issue. Multi-finding support required careful context tracking across the pipeline.',
      },
      {
        id: 'llm-validation-integration',
        title: 'Connecting AI Generation with Deterministic Validation',
        description:
          'The system combines probabilistic AI generation with structured validation. Structured prompting, retrieval grounding, and bounded retries keep that balance practical.',
      },
      {
        id: 'modular-ai-pipeline',
        title: 'Separating Detection from Patch Generation',
        description:
          'Keeping scanning and detection independent from generation and validation made the pipeline more inspectable and easier to refine stage by stage.',
      },
    ],
    learnings: [
      {
        id: 'pipeline-design',
        title: 'Structured Pipelines Over Opaque Generation',
        description:
          'Specialized stages with shared context are more inspectable and trustworthy than a single opaque AI generation step.',
      },
      {
        id: 'grounded-remediation',
        title: 'Retrieval Before Generation',
        description:
          'Retrieving remediation guidance before prompting improves patch relevance and keeps Gemini grounded in known secure patterns.',
      },
      {
        id: 'validation-first',
        title: 'Validation-First AI Workflows',
        description:
          'Deterministic validation and iterative retries make AI-assisted remediation safer for engineering review.',
      },
    ],
    results: [
      {
        id: 'structured-workflow',
        value: '✓',
        label: 'Structured AI Security Workflow',
      },
      {
        id: 'ai-patches',
        value: '✓',
        label: 'Gemini-Assisted Patch Generation',
      },
      {
        id: 'automated-validation',
        value: '✓',
        label: 'Patch Validation & Retry Loop',
      },
      {
        id: 'multi-vulnerability',
        value: '✓',
        label: 'Multi-Vulnerability Processing',
      },
      {
        id: 'rest-api',
        value: '✓',
        label: 'FastAPI REST API',
      },
      {
        id: 'react-frontend',
        value: '✓',
        label: 'React Review Interface',
      },
      {
        id: 'modular-design',
        value: '✓',
        label: 'Modular Pipeline Architecture',
      },
      {
        id: 'inspectable-runs',
        value: '✓',
        label: 'Inspectable Execution Context',
      },
    ],
    nextSteps: null,
    nextVersion: [
      'Expanded vulnerability coverage',
      'Stronger multi-language parsing',
      'Improved patch diff presentation',
      'Deeper CI/CD integration',
      'Cloud deployment',
      'Authenticated team workspaces',
    ],
  },

  newssense: {
    category: 'AI Engineering · Semantic Search',
    role: 'AI Engineer',
    team: '2 Developers',
    heroDescription:
      'NewsSense is a multilingual semantic news search platform that uses text embeddings and vector-based similarity retrieval to find relevant Pakistani news articles by meaning rather than relying only on exact keyword matches.',
    overview:
      'NewsSense focuses on semantic search and retrieval engineering. Users search by meaning, not only by exact words. English and Urdu news content is represented as embeddings, indexed in a vector store, and retrieved through similarity search with supported language and metadata filtering.',
    problem:
      'Traditional keyword search depends heavily on lexical overlap between the query and documents. A user may describe a topic with different wording than the article itself, so relevant coverage can be missed even when the meaning aligns. Semantic retrieval addresses this by representing text as embeddings and comparing semantic similarity.',
    solution:
      'NewsSense converts news articles into dense vector representations with Sentence Transformers, stores those embeddings with article metadata in ChromaDB, and retrieves results by embedding the user query and running similarity search. Language filtering and metadata support narrow results after semantic retrieval, while Gradio provides the interactive search interface and FastAPI supports backend orchestration.',
    outcome:
      'NewsSense provides a semantic retrieval workflow that allows users to search indexed English and Urdu news content by meaning while applying supported language and metadata filters through an inspectable embedding and vector-search pipeline.',
    workflow: [
      {
        id: 'news-articles',
        title: 'News Articles',
        description:
          'English and Urdu Pakistani news articles are collected into a standardized dataset for indexing.',
      },
      {
        id: 'preprocessing',
        title: 'Text Preprocessing / Preparation',
        description:
          'Articles are cleaned, standardized, and prepared so titles and content are suitable for embedding.',
      },
      {
        id: 'chunking',
        title: 'Chunking',
        description:
          'Longer articles are split into overlapping chunks so retrieval can match relevant passages while preserving context.',
      },
      {
        id: 'embedding-generation',
        title: 'Embedding Generation',
        description:
          'Sentence Transformers converts each chunk into a dense vector representation for semantic comparison.',
      },
      {
        id: 'vector-index',
        title: 'Vector Index / Collection',
        description:
          'Embeddings are stored with document text and metadata in ChromaDB for searchable vector retrieval.',
      },
      {
        id: 'user-query',
        title: 'User Query',
        description:
          'Users submit English or Urdu search queries through the Gradio interface.',
      },
      {
        id: 'query-embedding',
        title: 'Query Embedding',
        description:
          'The query follows the same embedding path so it can be compared against indexed article vectors.',
      },
      {
        id: 'similarity-retrieval',
        title: 'Similarity Retrieval',
        description:
          'Vector similarity search surfaces articles whose embeddings are closest to the query meaning.',
      },
      {
        id: 'metadata-filtering',
        title: 'Metadata Filtering',
        description:
          'Supported filters such as language narrow the retrieved set before results are presented.',
      },
      {
        id: 'ranked-results',
        title: 'Ranked Search Results',
        description:
          'Semantically relevant articles are returned for inspection in the interactive search interface.',
      },
    ],
    features: [
      {
        id: 'feature-semantic-search',
        title: 'Semantic Search',
        description:
          'Retrieves articles based on semantic similarity rather than exact keyword matching alone.',
      },
      {
        id: 'feature-embeddings',
        title: 'Embedding-Based Retrieval',
        description:
          'Represents queries and documents as vectors so similarity can be computed in embedding space.',
      },
      {
        id: 'feature-multilingual',
        title: 'Multilingual Queries',
        description:
          'Supports English and Urdu search scenarios within one retrieval pipeline.',
      },
      {
        id: 'feature-vector-search',
        title: 'Vector Search',
        description:
          'Uses ChromaDB for indexed vector retrieval, with FAISS evaluated during vector-database comparison.',
      },
      {
        id: 'feature-metadata-filtering',
        title: 'Metadata Filtering',
        description:
          'Allows results to be narrowed using supported article metadata such as language.',
      },
      {
        id: 'feature-gradio',
        title: 'Interactive Search Interface',
        description:
          'Gradio provides the interface for submitting queries and inspecting retrieved news results.',
      },
      {
        id: 'feature-fastapi',
        title: 'FastAPI Backend',
        description:
          'FastAPI supports backend search orchestration around the embedding and retrieval workflow.',
      },
      {
        id: 'feature-chromadb',
        title: 'ChromaDB Indexing',
        description:
          'Stores embeddings, documents, and metadata together for flexible semantic queries and filtering.',
      },
    ],
    techGroups: [
      {
        id: 'languages-frameworks',
        label: 'Languages & Frameworks',
        items: ['Python', 'FastAPI', 'Gradio'],
      },
      {
        id: 'ai-nlp',
        label: 'Embeddings & NLP',
        items: [
          'Sentence Transformers',
          'multilingual-e5-base',
          'SentencePiece',
        ],
      },
      {
        id: 'vector-databases',
        label: 'Vector Search',
        items: ['ChromaDB', 'FAISS'],
      },
      {
        id: 'data-tooling',
        label: 'Data & Tooling',
        items: ['NumPy', 'Pandas'],
      },
    ],
    techHighlights: [
      {
        id: 'model-selection',
        label: 'Embedding Model: multilingual-e5-base',
        detail:
          'Sentence Transformers converts text into dense vectors for semantic similarity. The project moved from intfloat/multilingual-e5-small to intfloat/multilingual-e5-base to improve multilingual semantic quality for English and Urdu retrieval, accepting higher memory and compute cost for stronger embedding representations.',
      },
      {
        id: 'sentence-transformers-role',
        label: 'Role of Sentence Transformers',
        detail:
          'Sentence Transformers turns queries and news chunks into vector representations so semantic similarity can be compared even when wording differs between the query and article text.',
      },
      {
        id: 'faiss-cpu',
        label: 'FAISS Evaluation',
        detail:
          'FAISS was evaluated for fast vector indexing and exact search. It offers strong search performance but does not store article metadata natively, which limited filtering needs without additional infrastructure.',
      },
      {
        id: 'chromadb-choice',
        label: 'Why ChromaDB Was Selected',
        detail:
          'ChromaDB stores vectors, documents, and metadata together with persistence and filtering support. That combination made bilingual semantic retrieval with language filters more practical than FAISS alone for this project.',
      },
      {
        id: 'dataset',
        label: 'Dataset Standardization',
        detail:
          'English and Urdu news datasets were merged into one standardized schema with Article ID, Language, Title, Content, Category, and Date. Preprocessing removed duplicates and empty records, standardized columns, and assigned unique article IDs.',
      },
      {
        id: 'preprocessing',
        label: 'Text Preprocessing Pipeline',
        detail:
          'URLs, email addresses, HTML tags, and extra spaces were removed, then title and content were combined to improve embedding quality before indexing.',
      },
      {
        id: 'chunking',
        label: 'Chunking Strategy',
        detail:
          'Articles were split into 80-word chunks with 20-word overlap to preserve context across boundaries. Each chunk received its own Chunk ID linked to the original article.',
      },
      {
        id: 'tokenization-embeddings',
        label: 'Tokenization & Embeddings',
        detail:
          'Each chunk is processed with SentencePiece, passed through multilingual-e5-base to produce a 768-dimensional embedding, and stored in ChromaDB with metadata for filtered retrieval.',
      },
    ],
    gallery: [
      {
        id: 'landing-interface',
        src: newsCover,
        alt: 'NewsSense landing interface',
        caption: 'Landing Interface — branded search experience with live index status.',
      },
      {
        id: 'search-interface',
        src: newsSearch,
        alt: 'NewsSense search interface',
        caption: 'Search Interface — Gradio-based discovery with popular news categories.',
      },
      {
        id: 'active-search',
        src: newsActiveSearch,
        alt: 'NewsSense active search query',
        caption: 'Active Search — query entry with recent history and popular topics.',
      },
      {
        id: 'semantic-results',
        src: newsResults,
        alt: 'NewsSense semantic search results',
        caption: 'Semantic Search Results — similarity-ranked articles returned by meaning.',
      },
      {
        id: 'language-filter',
        src: newsLanguage,
        alt: 'NewsSense language filtering controls',
        caption: 'Language Filtering — All Languages, English, or Urdu with relevance sorting.',
      },
      {
        id: 'bilingual-results',
        src: newsBilingual,
        alt: 'NewsSense bilingual English and Urdu results',
        caption: 'Bilingual Results — English and Urdu articles ranked by semantic similarity.',
      },
      {
        id: 'urdu-results',
        src: newsUrdu,
        alt: 'NewsSense Urdu semantic results',
        caption: 'Urdu Retrieval — multilingual semantic matching for Urdu news coverage.',
      },
      {
        id: 'results-pagination',
        src: newsPagination,
        alt: 'NewsSense results pagination',
        caption: 'Results Navigation — paginated browsing across retrieved result sets.',
      },
      {
        id: 'results-navigation',
        src: newsNavigation,
        alt: 'NewsSense results navigation and branding footer',
        caption: 'Discovery Footer — product branding beneath navigable search results.',
      },
      {
        id: 'interface-footer',
        src: newsFooter,
        alt: 'NewsSense interface footer',
        caption: 'Interface Footer — Gradio-powered semantic search product branding.',
      },
    ],
    architecture: {
      title: 'System Architecture',
      subtitle:
        'Interface, API, retrieval, and vector-index layers for semantic news search.',
      summary:
        'NewsSense follows a semantic retrieval architecture rather than a generative chatbot design. Gradio provides the search interface, FastAPI supports backend orchestration, Sentence Transformers generates embeddings for documents and queries, and ChromaDB stores vectors with article metadata for similarity retrieval and filtering. FAISS was evaluated during vector-database comparison, while ChromaDB was selected for combined vector, document, and metadata storage.',
      points: [
        'Interface Layer — Gradio search interface for queries and results',
        'Application / API Layer — FastAPI search orchestration',
        'Retrieval Layer — Sentence Transformers embedding generation and similarity search',
        'Storage / Index Layer — ChromaDB vector collection (FAISS evaluated)',
        'Metadata Layer — language, title, content, category, date, chunk IDs',
        'Indexing path — clean → chunk → embed → store vectors + metadata',
        'Query path — embed query → similarity retrieval → metadata filtering → results',
      ],
    },
    challenges: [
      {
        id: 'semantic-relevance',
        title: 'Semantic Relevance',
        description:
          'Retrieving results that are genuinely related to user intent required moving beyond shared keywords to embedding-based similarity.',
      },
      {
        id: 'multilingual-queries',
        title: 'Multilingual Queries',
        description:
          'Supporting English and Urdu search scenarios consistently required careful dataset labeling, multilingual tokenization, and an embedding model suited to both languages.',
      },
      {
        id: 'retrieval-filtering',
        title: 'Retrieval + Filtering Interaction',
        description:
          'Language and metadata filters needed to narrow results without undermining the semantic retrieval workflow that surfaces candidates by meaning.',
      },
      {
        id: 'vector-database-choice',
        title: 'Choosing a Vector Store',
        description:
          'Comparing FAISS and ChromaDB meant weighing search speed against metadata storage, persistence, and filtering needed for bilingual news retrieval.',
      },
      {
        id: 'embedding-model-choice',
        title: 'Choosing the Right Embedding Model',
        description:
          'Balancing speed and quality meant testing e5-small, identifying weaker relevance, and upgrading to e5-base for stronger multilingual semantics.',
      },
    ],
    learnings: [
      {
        id: 'semantic-pipeline',
        title: 'Semantic Retrieval Pipeline Design',
        description:
          'Documents → embeddings → vector index → query embedding → similarity retrieval → filtering → results is a clearer engineering model than treating search as a black-box AI feature.',
      },
      {
        id: 'grounded-vector-search',
        title: 'Metadata Matters in Vector Search',
        description:
          'Storing embeddings with language and article metadata makes semantic retrieval practical for bilingual filtering and result presentation.',
      },
      {
        id: 'model-tradeoffs',
        title: 'Embedding Quality Trade-offs',
        description:
          'Stronger multilingual embeddings can improve semantic relevance, but they also increase memory and compute requirements that must be considered explicitly.',
      },
    ],
    results: [
      {
        id: 'semantic-engine',
        value: '✓',
        label: 'Semantic News Retrieval Pipeline',
      },
      {
        id: 'bilingual-retrieval',
        value: '✓',
        label: 'English & Urdu Query Support',
      },
      {
        id: 'transformer-embeddings',
        value: '✓',
        label: 'Sentence Transformers Embeddings',
      },
      {
        id: 'chromadb-integration',
        value: '✓',
        label: 'ChromaDB Vector Indexing',
      },
      {
        id: 'vector-pipeline',
        value: '✓',
        label: 'FAISS Evaluation + ChromaDB Choice',
      },
      {
        id: 'gradio-interface',
        value: '✓',
        label: 'Gradio Search Interface',
      },
      {
        id: 'fastapi-backend',
        value: '✓',
        label: 'FastAPI Backend Orchestration',
      },
      {
        id: 'metadata-filtering',
        value: '✓',
        label: 'Language / Metadata Filtering',
      },
    ],
    nextSteps: null,
    nextVersion: [
      'Hybrid Search',
      'Expand Dataset',
      'Support More Languages',
      'Advanced Re-ranking',
      'Cloud Deployment',
      'Performance Optimization',
    ],
  },

  voicex: {
    category: 'Full-Stack Development',
    role: 'Full-Stack Developer',
    team: '2 Developers',
    duration: 'Approximately 2 Weeks',
    heroDescription:
      'VoiceX is a full-stack complaint and feedback portal that connects students with an administrative workflow for submitting, tracking, and resolving campus complaints through a web interface, REST APIs, and MongoDB persistence.',
    overview:
      'VoiceX demonstrates practical full-stack web development: a student-facing interface for complaint submission and tracking, an Express.js REST API for application logic, MongoDB for persistent storage, and role-based admin tools for reviewing and managing the complaint lifecycle.',
    problem:
      'Campus complaint handling often relies on paper forms, verbal reports, or scattered channels. That makes it harder to submit structured complaints, track status, keep communication consistent, and give administrators a clear workflow for review and resolution.',
    solution:
      'VoiceX centralizes the workflow into a full-stack web application. Students register, verify accounts, submit complaints with supporting files, track status, and provide feedback after resolution. Administrators review complaints, assign departments, update status, and manage the operational side of the lifecycle through protected admin views backed by REST APIs and MongoDB.',
    outcome:
      'VoiceX provides a structured full-stack workflow for submitting, managing, and tracking university complaints through a JavaScript frontend, Express REST API backend, MongoDB persistence layer, JWT-based access control, and automated resolution email notifications.',
    workflow: [
      {
        id: 'registration',
        title: 'Student Registration',
        description:
          'Students create an account and select the appropriate role for portal access.',
      },
      {
        id: 'otp',
        title: 'Email OTP Verification',
        description:
          'Email verification confirms the account before activation.',
      },
      {
        id: 'login',
        title: 'Secure Login',
        description:
          'Authenticated access uses JWT-backed sessions for students and administrators.',
      },
      {
        id: 'submission',
        title: 'Complaint / Feedback Submission',
        description:
          'Students submit structured complaints with categories, details, and optional file attachments.',
      },
      {
        id: 'api',
        title: 'REST API Processing',
        description:
          'Express.js REST APIs handle request processing, validation, and application workflow operations.',
      },
      {
        id: 'mongodb',
        title: 'MongoDB Persistence',
        description:
          'Complaint, user, and workflow data are stored and retrieved through MongoDB.',
      },
      {
        id: 'admin-review',
        title: 'Administrative Review',
        description:
          'Administrators review complaints, assign departments, and manage operational updates.',
      },
      {
        id: 'status-update',
        title: 'Status Update',
        description:
          'Complaint status moves through the supported lifecycle as administrators process the case.',
      },
      {
        id: 'notification',
        title: 'Resolution Notification',
        description:
          'An automated resolution email notifies the student after the complaint is resolved.',
      },
      {
        id: 'feedback',
        title: 'Student Feedback',
        description:
          'Students provide ratings and comments after resolution to close the loop.',
      },
      {
        id: 'closed',
        title: 'Complaint Closed',
        description:
          'The complaint lifecycle completes after feedback is collected.',
      },
    ],
    features: [
      {
        id: 'complaint-submission',
        title: 'Complaint & Feedback Submission',
        description:
          'Students submit structured complaints with categories, details, attachments, and later provide feedback after resolution.',
      },
      {
        id: 'role-based-workflows',
        title: 'Role-Based Workflows',
        description:
          'Students and administrators receive functionality appropriate to their role through JWT-backed access control.',
      },
      {
        id: 'status-tracking',
        title: 'Status Tracking',
        description:
          'Students can follow complaint progress through the supported lifecycle after submission.',
      },
      {
        id: 'admin-management',
        title: 'Administrative Management',
        description:
          'Administrators review complaints, assign departments, update status, and manage the operational workflow.',
      },
      {
        id: 'rest-api-integration',
        title: 'REST API Integration',
        description:
          'The frontend communicates with backend services through Express.js REST APIs for authentication and complaint operations.',
      },
      {
        id: 'mongodb-persistence',
        title: 'MongoDB Persistence',
        description:
          'Application data for users, complaints, and workflow state is stored and retrieved through MongoDB.',
      },
      {
        id: 'authentication',
        title: 'Authentication & Verification',
        description:
          'Secure login, JWT authentication, email OTP verification, and password hashing protect portal access.',
      },
      {
        id: 'notifications',
        title: 'Resolution Email Notifications',
        description:
          'Nodemailer sends an automatic email notification after complaint resolution.',
      },
    ],
    techGroups: [
      {
        id: 'frontend',
        label: 'Frontend',
        items: ['HTML5', 'CSS3', 'JavaScript'],
      },
      {
        id: 'backend',
        label: 'Backend & APIs',
        items: ['Node.js', 'Express.js', 'REST APIs'],
      },
      {
        id: 'database',
        label: 'Database',
        items: ['MongoDB'],
      },
      {
        id: 'authentication',
        label: 'Authentication',
        items: ['JWT', 'bcrypt.js'],
      },
      {
        id: 'services',
        label: 'Services',
        items: ['Nodemailer', 'Multer'],
      },
      {
        id: 'development',
        label: 'Development',
        items: ['VS Code', 'Postman'],
      },
    ],
    techHighlights: [
      {
        id: 'frontend-layer',
        label: 'Frontend Layer',
        detail:
          'HTML5, CSS3, and JavaScript provide the student and administrator interfaces for registration, login, complaint submission, tracking, dashboards, and feedback.',
      },
      {
        id: 'backend-layer',
        label: 'Backend / API Layer',
        detail:
          'Node.js and Express.js expose REST APIs that process requests, enforce authentication and authorization, and coordinate complaint workflow operations.',
      },
      {
        id: 'database-layer',
        label: 'Database Layer',
        detail:
          'MongoDB persists users, complaints, statuses, and related workflow information used by both student and admin flows.',
      },
      {
        id: 'integration',
        label: 'Frontend–Backend Integration',
        detail:
          'The interface communicates with backend services through REST APIs, keeping presentation separate from application logic and data persistence.',
      },
      {
        id: 'roles',
        label: 'Role-Based Access',
        detail:
          'Student and administrator roles determine available views and actions, with JWT authorization protecting routes and operations.',
      },
      {
        id: 'lifecycle',
        label: 'Complaint Lifecycle',
        detail:
          'Complaints move from submission through administrative review and status updates to resolution, notification, feedback, and closure.',
      },
    ],
    gallery: [
      {
        id: 'login',
        src: voiceLogin,
        alt: 'VoiceX login',
        caption: 'Secure authentication for students and administrators.',
      },
      {
        id: 'register',
        src: voiceReg,
        alt: 'VoiceX registration',
        caption: 'Account creation with role selection.',
      },
      {
        id: 'otp',
        src: voiceOtp,
        alt: 'VoiceX OTP verification',
        caption: 'Email verification before account activation.',
      },
      {
        id: 'dashboard',
        src: voiceCover,
        alt: 'VoiceX student dashboard',
        caption: 'Student dashboard showing complaint statistics.',
      },
      {
        id: 'complaint',
        src: voiceComplaint,
        alt: 'VoiceX complaint submission',
        caption:
          'Complaint submission with categories, attachments, and detailed information.',
      },
      {
        id: 'tracking',
        src: voiceTracking,
        alt: 'VoiceX complaint tracking',
        caption: 'Students can monitor complaint status through the portal.',
      },
      {
        id: 'admin-dashboard',
        src: voiceAdmin,
        alt: 'VoiceX admin dashboard',
        caption:
          'Administrative dashboard with complaint overview and operational insights.',
      },
      {
        id: 'manage-complaints',
        src: voiceManage,
        alt: 'VoiceX manage complaints',
        caption: 'Centralized complaint management for administrators.',
      },
      {
        id: 'complaint-details',
        src: voiceDetails,
        alt: 'VoiceX complaint details',
        caption: 'Review, assign departments, and update complaint status.',
      },
      {
        id: 'resolution-mail',
        src: voiceResolution,
        alt: 'VoiceX resolution email',
        caption: 'Automatic email notification sent after complaint resolution.',
      },
      {
        id: 'feedback',
        src: voiceFeedback,
        alt: 'VoiceX feedback',
        caption: 'Students provide ratings and comments after resolution.',
      },
      {
        id: 'thank-you',
        src: voiceThankYou,
        alt: 'VoiceX thank you',
        caption: 'Confirmation after successful feedback submission.',
      },
    ],
    architecture: {
      title: 'System Architecture',
      subtitle:
        'Frontend, REST API, and MongoDB layers for a full-stack complaint workflow.',
      summary:
        'VoiceX is organized as a practical full-stack application rather than a distributed platform. The frontend handles student and administrator interactions, Express.js REST APIs process authentication and complaint operations, and MongoDB stores persistent application data. Role-based access separates student and admin workflows while Nodemailer supports resolution email notifications.',
      points: [
        'Frontend — HTML5, CSS3, and JavaScript interfaces for students and admins',
        'Backend — Node.js / Express.js REST API for request processing and workflow logic',
        'Database — MongoDB persistence for users, complaints, and related state',
        'Integration — frontend communicates with backend through REST APIs',
        'Authentication — JWT, bcrypt password hashing, and email OTP verification',
        'Roles — student and administrator access with protected routes',
        'Lifecycle — submission → review → status update → resolution → feedback → closed',
        'Services — Multer for file uploads and Nodemailer for resolution emails',
      ],
    },
    challenges: [
      {
        id: 'frontend-backend-state',
        title: 'Coordinating Frontend and Backend State',
        description:
          'Keeping complaint views synchronized with backend data and status changes required clear REST API contracts and consistent client updates.',
      },
      {
        id: 'jwt-rbac',
        title: 'Role-Based Workflows',
        description:
          'Designing JWT authentication with role-based access control ensured students and administrators only received functionality appropriate to their role.',
      },
      {
        id: 'lifecycle',
        title: 'Complaint Lifecycle Management',
        description:
          'Representing complaint transitions through submission, review, status updates, resolution, and feedback needed a coherent workflow across UI and API layers.',
      },
      {
        id: 'mongodb-persistence',
        title: 'Persistent Application State',
        description:
          'Designing MongoDB-backed data structures for users and complaints was essential for reliable tracking across the full complaint lifecycle.',
      },
      {
        id: 'notifications',
        title: 'Resolution Communication',
        description:
          'Connecting status resolution to automated email notification required coordinating backend workflow events with Nodemailer delivery.',
      },
    ],
    learnings: [
      {
        id: 'rest-api-design',
        title: 'REST API Design',
        description:
          'Separating presentation from application logic through Express REST APIs made the complaint workflow easier to extend and reason about.',
      },
      {
        id: 'jwt-auth',
        title: 'JWT Authentication',
        description:
          'Token-based authentication with role checks provided a practical foundation for protecting student and admin routes.',
      },
      {
        id: 'mongodb',
        title: 'MongoDB Integration',
        description:
          'Document-oriented persistence supported users, complaints, and workflow state for a full-stack campus portal.',
      },
      {
        id: 'fullstack-structure',
        title: 'Full-Stack Project Structure',
        description:
          'Building registration, submission, tracking, admin review, notifications, and feedback in one system reinforced end-to-end application design.',
      },
    ],
    results: [
      {
        id: 'lifecycle',
        value: '✓',
        label: 'Complete Complaint Lifecycle',
      },
      {
        id: 'auth',
        value: '✓',
        label: 'JWT Authentication & Role Access',
      },
      {
        id: 'email',
        value: '✓',
        label: 'Automated Resolution Emails',
      },
      {
        id: 'rest',
        value: '✓',
        label: 'Express REST API Backend',
      },
      {
        id: 'mongodb',
        value: '✓',
        label: 'MongoDB Persistence',
      },
      {
        id: 'admin',
        value: '✓',
        label: 'Administrative Complaint Management',
      },
      {
        id: 'tracking',
        value: '✓',
        label: 'Student Status Tracking',
      },
      {
        id: 'feedback',
        value: '✓',
        label: 'Post-Resolution Feedback',
      },
    ],
    nextSteps: null,
    nextVersion: [
      'Cloud deployment',
      'Real-time notifications',
      'Analytics enhancements',
      'Mobile support',
      'Scalability improvements',
      'Additional university administration features',
    ],
  },

  mediflow: {
    category: 'Database Application',
    role: 'Database & APEX Developer',
    team: '2 Developers',
    heroDescription:
      'MediFlow is a database-driven clinic appointment and records system designed to manage appointments, patient information, doctor records, and related administrative workflows through Oracle APEX and SQL.',
    overview:
      'MediFlow focuses on database application engineering. Oracle APEX provides forms, interactive reports, and CRUD interfaces over a relational Oracle Database, organizing clinic entities such as patients, doctors, appointments, departments, prescriptions, medicines, and payments into a structured operational workflow.',
    problem:
      'Clinic information such as appointments, patient records, and doctor information benefits from a structured relational system rather than disconnected manual records or spreadsheets. Without a shared database application, duplicate entries, inconsistent scheduling data, and fragmented administrative views become harder to manage.',
    solution:
      'MediFlow centralizes clinic appointment and records management in an Oracle APEX application backed by SQL and a relational Oracle Database. Administrators can work with patient and doctor records, schedule appointments, manage related operational data, and inspect information through interactive reports and database-driven views.',
    outcome:
      'MediFlow provides a structured database application for managing clinic appointments and records through Oracle APEX, SQL, interactive reports, and CRUD workflows over related relational entities.',
    workflow: [
      {
        id: 'interaction',
        title: 'Staff Interaction',
        description:
          'Administrators interact with MediFlow through Oracle APEX forms, reports, and dashboards.',
      },
      {
        id: 'operation',
        title: 'Appointment / Record Operation',
        description:
          'Users create, review, or update appointments and related clinic records through the application interface.',
      },
      {
        id: 'apex',
        title: 'Oracle APEX Application',
        description:
          'APEX provides the database-driven UI layer for forms, interactive reports, and operational views.',
      },
      {
        id: 'sql',
        title: 'SQL / Database Operations',
        description:
          'SQL supports querying and manipulating application data stored in the relational database.',
      },
      {
        id: 'stored-data',
        title: 'Stored Data',
        description:
          'Patient, doctor, appointment, and related operational records persist in Oracle Database.',
      },
      {
        id: 'reports',
        title: 'Reports / Updated Views',
        description:
          'Interactive reports and dashboards present updated views of stored clinic information.',
      },
    ],
    features: [
      {
        id: 'appointment-scheduling',
        title: 'Appointment Scheduling',
        description:
          'Create and manage clinic appointment records through the database application.',
      },
      {
        id: 'patient-records',
        title: 'Patient Records',
        description:
          'Store and manage structured patient information used across clinic workflows.',
      },
      {
        id: 'doctor-records',
        title: 'Doctor Records',
        description:
          'Maintain doctor profiles, departments, and related assignment information.',
      },
      {
        id: 'crud-workflows',
        title: 'CRUD Workflows',
        description:
          'Perform supported create, read, update, and delete operations on clinic records through APEX interfaces.',
      },
      {
        id: 'interactive-reports',
        title: 'Interactive Reports',
        description:
          'Inspect and work with stored database information through Oracle APEX reporting interfaces.',
      },
      {
        id: 'sql-data-management',
        title: 'SQL-Driven Data Management',
        description:
          'Use SQL for database operations and retrieval across the relational clinic schema.',
      },
      {
        id: 'department-management',
        title: 'Department Management',
        description:
          'Maintain department records and doctor assignments within the relational model.',
      },
      {
        id: 'operational-records',
        title: 'Operational Records',
        description:
          'Manage related operational data such as prescriptions, medicines, and payments where supported by the schema.',
      },
    ],
    techGroups: [
      {
        id: 'application',
        label: 'Application',
        items: ['Oracle APEX'],
      },
      {
        id: 'database',
        label: 'Database',
        items: ['Oracle Database', 'Oracle SQL'],
      },
      {
        id: 'languages',
        label: 'Languages',
        items: ['SQL', 'PL/SQL'],
      },
      {
        id: 'concepts',
        label: 'Database Concepts',
        items: [
          'Relational Database Design',
          'Entity Relationships',
          'CRUD Operations',
          'Interactive Reports',
        ],
      },
    ],
    techHighlights: [
      {
        id: 'oracle-apex',
        label: 'Oracle APEX Application Layer',
        detail:
          'Oracle APEX provides forms, interactive reports, dashboards, and CRUD interfaces over the underlying Oracle Database without requiring a separate custom frontend stack.',
      },
      {
        id: 'sql-role',
        label: 'SQL Data Operations',
        detail:
          'SQL supports inserting, querying, updating, and deleting clinic records, as well as retrieving appointment and related operational information for application views.',
      },
      {
        id: 'relational-model',
        label: 'Relational Data Model',
        detail:
          'Core entities such as departments, doctors, patients, appointments, medicines, prescriptions, and payments are connected through primary and foreign keys to support structured clinic workflows.',
      },
      {
        id: 'interactive-reports',
        label: 'Interactive Reports',
        detail:
          'APEX interactive reports and dashboards give administrators practical views over stored appointment, department, and operational data.',
      },
      {
        id: 'crud',
        label: 'CRUD Workflows',
        detail:
          'APEX forms and actions connect user interactions to database create, read, update, and delete operations for supported clinic entities.',
      },
    ],
    gallery: [
      {
        id: 'landing-dashboard',
        src: mediCover,
        alt: 'MediFlow landing dashboard',
        caption: 'Landing Dashboard — Oracle APEX overview of clinic operations.',
      },
      {
        id: 'hospital-overview',
        src: mediHome1,
        alt: 'MediFlow clinic overview',
        caption: 'Clinic Overview — high-level operational summary from stored records.',
      },
      {
        id: 'analytics-dashboard',
        src: mediHome2,
        alt: 'MediFlow interactive reports dashboard',
        caption: 'Interactive Reports — database-backed views of appointments and operations.',
      },
      {
        id: 'department-statistics',
        src: mediHome3,
        alt: 'MediFlow department statistics',
        caption: 'Department Views — relational department information presented in APEX.',
      },
      {
        id: 'operations-overview',
        src: mediHome4,
        alt: 'MediFlow operations overview',
        caption: 'Operations Overview — administrative visibility across clinic workflows.',
      },
      {
        id: 'doctor-dashboard',
        src: mediDoctor,
        alt: 'MediFlow doctor management',
        caption: 'Doctor Management — structured doctor records in the database application.',
      },
      {
        id: 'patient-dashboard',
        src: mediPatient,
        alt: 'MediFlow patient management',
        caption: 'Patient Management — structured patient records for clinic workflows.',
      },
      {
        id: 'doctor-form',
        src: mediDoctorForm,
        alt: 'MediFlow doctor form',
        caption: 'Doctor Form — APEX form for creating and updating doctor records.',
      },
      {
        id: 'patient-form',
        src: mediPatientForm,
        alt: 'MediFlow patient form',
        caption: 'Patient Form — APEX form for creating and updating patient records.',
      },
      {
        id: 'doctor-records',
        src: mediTable,
        alt: 'MediFlow doctor records table',
        caption: 'Doctor Records — interactive table view over stored doctor data.',
      },
      {
        id: 'patient-records',
        src: mediPatientView,
        alt: 'MediFlow patient records',
        caption: 'Patient Records — interactive table view over stored patient data.',
      },
    ],
    architecture: {
      title: 'Database Architecture',
      subtitle:
        'Oracle APEX interfaces over a relational Oracle Database schema.',
      summary:
        'MediFlow is fundamentally a database-driven application. Oracle APEX provides the application layer for forms, interactive reports, and CRUD workflows, while SQL operates against a relational Oracle Database. Core entities such as departments, doctors, patients, appointments, medicines, prescriptions, and payments are connected through primary and foreign keys to support structured clinic operations.',
      points: [
        'Application Layer — Oracle APEX forms, reports, and dashboards',
        'Data Access Layer — SQL operations for query and record management',
        'Storage Layer — Oracle Database relational schema',
        'Entities — Departments, Doctors, Patients, Appointments',
        'Related records — Medicines, Prescriptions, Payments',
        'Relationships — primary keys, foreign keys, and one-to-many links',
        'Workflow — staff interaction → APEX operation → SQL → stored data → reports',
      ],
    },
    challenges: [
      {
        id: 'relational-organization',
        title: 'Relational Data Organization',
        description:
          'Representing related clinic entities in a structured database model required clear relationships between patients, doctors, appointments, and supporting operational records.',
      },
      {
        id: 'appointment-data',
        title: 'Appointment Data Management',
        description:
          'Maintaining consistent appointment records meant connecting scheduling actions in APEX to reliable SQL-backed persistence.',
      },
      {
        id: 'crud-workflows',
        title: 'CRUD Workflows',
        description:
          'Connecting application forms and actions with database create, read, update, and delete operations was essential for usable clinic record management.',
      },
      {
        id: 'usable-interfaces',
        title: 'Usable Database Interfaces',
        description:
          'Presenting structured database information through Oracle APEX forms and interactive reports required balancing clarity with operational completeness.',
      },
      {
        id: 'referential-integrity',
        title: 'Referential Integrity',
        description:
          'Keeping related records consistent across departments, doctors, patients, and appointments depended on careful primary-key and foreign-key design.',
      },
    ],
    learnings: [
      {
        id: 'apex-database-apps',
        title: 'Database-Driven Application Design',
        description:
          'Oracle APEX is effective for building practical interfaces directly over relational data when the primary goal is structured record management.',
      },
      {
        id: 'relational-modeling',
        title: 'Relational Modeling',
        description:
          'Clear entity relationships make appointment and records workflows easier to maintain than disconnected manual tracking.',
      },
      {
        id: 'sql-crud',
        title: 'SQL and CRUD Workflows',
        description:
          'Connecting forms and reports to SQL-backed CRUD operations turns a database schema into a usable clinic application.',
      },
    ],
    results: [
      {
        id: 'database-app',
        value: '✓',
        label: 'Database-Driven Clinic Application',
      },
      {
        id: 'apex-application',
        value: '✓',
        label: 'Oracle APEX Interfaces',
      },
      {
        id: 'relational-entities',
        value: '7',
        label: 'Relational Database Entities',
      },
      {
        id: 'crud-operations',
        value: '✓',
        label: 'Supported CRUD Workflows',
      },
      {
        id: 'interactive-reports',
        value: '✓',
        label: 'Interactive Reports & Views',
      },
      {
        id: 'appointments',
        value: '✓',
        label: 'Appointment Record Management',
      },
      {
        id: 'patient-doctor',
        value: '✓',
        label: 'Patient & Doctor Records',
      },
      {
        id: 'sql',
        value: '✓',
        label: 'SQL-Driven Data Operations',
      },
    ],
    nextSteps: null,
    nextVersion: [
      'Role-Based Authentication',
      'Patient Portal',
      'Doctor Availability Calendar',
      'Online Appointment Booking',
      'Email Notifications',
      'SMS Reminders',
      'Digital Prescriptions',
      'REST API',
      'Cloud Deployment',
    ],
  },
}

export function getCaseStudyBySlug(slug: string): ProjectCaseStudy | null {
  return caseStudies[slug] ?? null
}
