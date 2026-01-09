import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type MockFile, SAMPLE_FILES } from '../data/mockData';

interface Project {
    id: string;
    name: string;
    status: 'Draft' | 'Generated';
    timestamp: string;
    industry?: string;
    productType?: string;
    updatedAt?: string;
    fileCount?: number;
    brief?: any;
}

interface DiscoveryState {
    projects: Project[];
    currentProjectName: string;
    currentStepIndex: number;
    files: MockFile[];
    messiness: 'low' | 'medium' | 'high';
    sensitivity: 'Public' | 'Internal' | 'Confidential' | 'Regulated';
    industry: string;
    productType: string;
    timeline: string;
    constraints: string[];
    outputFormats: string[];
    aiTone: string;
    isGenerating: boolean;
    generationProgress: number;
    generationStep: number;
    generationLogs: string[];
    generatedBrief: any | null;

    // Actions
    setProjectName: (name: string) => void;
    setStepIndex: (index: number) => void;
    addFile: (file: MockFile) => void;
    toggleFile: (id: string) => void;
    setMessiness: (level: 'low' | 'medium' | 'high') => void;
    setSensitivity: (level: any) => void;
    setIndustry: (industry: string) => void;
    setProductType: (type: string) => void;
    setTimeline: (timeline: string) => void;
    toggleConstraint: (constraint: string) => void;
    toggleOutputFormat: (format: string) => void;
    setAiTone: (tone: string) => void;
    startGeneration: () => void;
    resetWizard: () => void;
    loadSampleProject: () => void;
}

export const useStore = create<DiscoveryState>()(
    persist(
        (set, get) => ({
            projects: [
                {
                    id: 'p1',
                    name: 'Member Portal Modernization',
                    status: 'Generated',
                    timestamp: '2026-01-08 14:00',
                    industry: 'Healthcare',
                    productType: 'Member portal',
                    updatedAt: '2026-01-08T14:00:00Z',
                    fileCount: 6
                },
                {
                    id: 'p2',
                    name: 'Claims API Integration',
                    status: 'Draft',
                    timestamp: '2026-01-09 10:30',
                    industry: 'Insurance',
                    productType: 'Internal tool',
                    updatedAt: '2026-01-09T10:30:00Z',
                    fileCount: 3
                },
            ],
            currentProjectName: 'New Discovery Project',
            currentStepIndex: 0,
            files: SAMPLE_FILES,
            messiness: 'medium',
            sensitivity: 'Confidential',
            industry: 'Healthcare',
            productType: 'Member portal',
            timeline: '12 weeks',
            constraints: ['Accessibility AA required', 'Cloud-first'],
            outputFormats: ['Discovery Brief', 'Persona cards', 'NFR matrix'],
            aiTone: 'Product',
            isGenerating: false,
            generationProgress: 0,
            generationStep: 0,
            generationLogs: [],
            generatedBrief: null,

            setProjectName: (name) => set({ currentProjectName: name }),
            setStepIndex: (index) => set({ currentStepIndex: index }),
            addFile: (file) => set((state) => ({ files: [...state.files, file] })),
            toggleFile: (id) => set((state) => ({
                files: state.files.map(f => f.id === id ? { ...f, included: !f.included } : f)
            })),
            setMessiness: (level) => set({ messiness: level }),
            setSensitivity: (level) => set({ sensitivity: level }),
            setIndustry: (industry) => set({ industry }),
            setProductType: (type) => set({ productType: type }),
            setTimeline: (timeline) => set({ timeline }),
            toggleConstraint: (constraint) => set((state) => ({
                constraints: state.constraints.includes(constraint)
                    ? state.constraints.filter(c => c !== constraint)
                    : [...state.constraints, constraint]
            })),
            toggleOutputFormat: (format) => set((state) => ({
                outputFormats: state.outputFormats.includes(format)
                    ? state.outputFormats.filter(f => f !== format)
                    : [...state.outputFormats, format]
            })),
            setAiTone: (tone) => set({ aiTone: tone }),

            startGeneration: () => {
                set({ isGenerating: true, generationProgress: 0, generationStep: 0, generationLogs: [] });

                const steps = [
                    "Ingesting documents",
                    "Cleaning & de-duplicating",
                    "Extracting entities",
                    "Drafting problem statements",
                    "Building personas",
                    "Deriving NFRs",
                    "Risks & assumptions",
                    "Opportunity sizing",
                    "Formatting brief"
                ];

                const logs = [
                    "Detected 4 personas",
                    "Found 12 NFR candidates",
                    "Identified conflicting requirements: 'IE11 support' vs 'Modern UI'",
                    "Extracted 8 key problem statements",
                    "Cross-referencing claims data with stakeholder interviews",
                    "Calculating opportunity sizing based on member count",
                    "Finalizing traceability links..."
                ];

                let currentStep = 0;
                const interval = setInterval(() => {
                    const progress = Math.min(((currentStep + 1) / steps.length) * 100, 100);
                    const newLogs = [...get().generationLogs];
                    if (currentStep < logs.length) {
                        newLogs.push(logs[currentStep]);
                    }

                    set({
                        generationProgress: progress,
                        generationStep: currentStep,
                        generationLogs: newLogs
                    });

                    if (currentStep >= steps.length - 1) {
                        clearInterval(interval);
                        // Mock generated brief
                        const brief = generateMockBrief();
                        set({
                            isGenerating: false,
                            generatedBrief: brief,
                            projects: [
                                {
                                    id: Date.now().toString(),
                                    name: get().currentProjectName,
                                    status: 'Generated',
                                    timestamp: new Date().toLocaleString(),
                                    industry: get().industry,
                                    productType: get().productType,
                                    updatedAt: new Date().toISOString(),
                                    fileCount: get().files.filter(f => f.included).length
                                },
                                ...get().projects
                            ]
                        });
                    }
                    currentStep++;
                }, 2000); // 2 seconds per step = ~18 seconds total
            },

            resetWizard: () => set({
                currentProjectName: 'New Discovery Project',
                currentStepIndex: 0,
                files: SAMPLE_FILES,
                messiness: 'medium',
                sensitivity: 'Confidential',
                industry: 'Healthcare',
                productType: 'Member portal',
                timeline: '12 weeks',
                constraints: ['Accessibility AA required', 'Cloud-first'],
                outputFormats: ['Discovery Brief', 'Persona cards', 'NFR matrix'],
                aiTone: 'Product',
                isGenerating: false,
                generatedBrief: null
            }),

            loadSampleProject: () => {
                set({
                    currentProjectName: 'Member Portal Modernization',
                    currentStepIndex: 3,
                    files: SAMPLE_FILES.map(f => ({ ...f, included: true })),
                    messiness: 'medium',
                    sensitivity: 'Regulated',
                    industry: 'Healthcare',
                    productType: 'Member portal',
                    timeline: '12 weeks',
                    constraints: ['Accessibility AA required', 'Cloud-first', 'Must reuse existing systems'],
                    outputFormats: ['Discovery Brief', 'Persona cards', 'NFR matrix', 'Risk register'],
                    aiTone: 'Product',
                    generatedBrief: generateMockBrief()
                });
            }
        }),
        {
            name: 'ai-discovery-copilot-storage',
            partialize: (state) => ({ projects: state.projects }),
        }
    )
);

function generateMockBrief() {
    return {
        executiveSummary: [
            "Modernize the 12-year-old legacy member portal to improve engagement.",
            "Address high call center volume (30%) caused by password reset issues.",
            "Implement a mobile-first, responsive design for better member access.",
            "Ensure full HIPAA and SOC2 compliance for all data handling.",
            "Integrate with legacy Oracle CRM while planning for future migration.",
            "Support multi-language requirements (English, Spanish, Mandarin)."
        ],
        problemStatements: [
            {
                id: 'ps1',
                statement: "High friction in login and password reset flows.",
                impacts: "Members, Call Center Agents",
                evidence: "30% of call volume is password resets (Stakeholder Interview)",
                metric: "Reduce password-related calls by 50%",
                confidence: 95
            },
            {
                id: 'ps2',
                statement: "Lack of mobile-responsive interface.",
                impacts: "Mobile-first users, younger demographic",
                evidence: "Current mobile experience is a broken web view (Product Lead)",
                metric: "Increase mobile engagement by 40%",
                confidence: 90
            }
        ],
        personas: [
            {
                name: "Maria Rodriguez",
                role: "Busy Parent / Member",
                goals: "Quickly check claim status, find local providers.",
                painPoints: "Hard to use on phone, confusing navigation.",
                quote: "I just want to know if my kid's doctor visit was covered.",
                techComfort: "Medium"
            },
            {
                name: "Kevin Smith",
                role: "Call Center Agent",
                goals: "Help members resolve issues faster.",
                painPoints: "Spending too much time on simple password resets.",
                quote: "I wish members could just reset their own passwords easily.",
                techComfort: "High"
            }
        ],
        nfrs: [
            { category: 'Security', requirement: 'MFA for all logins', priority: 'Must', rationale: 'Compliance requirement' },
            { category: 'Performance', requirement: 'Page load < 2s', priority: 'Should', rationale: 'User experience' },
            { category: 'Accessibility', requirement: 'WCAG 2.1 AA', priority: 'Must', rationale: 'Legal compliance' }
        ],
        risks: [
            { item: 'Legacy CRM Integration', type: 'Risk', severity: 'High', likelihood: 'Medium', mitigation: 'Early API discovery' },
            { item: 'IE11 Support', type: 'Dependency', severity: 'Medium', likelihood: 'High', mitigation: 'Graceful degradation' }
        ],
        opportunitySizing: {
            timeSaved: 1200,
            costReduction: 45000,
            revenueUplift: 150000
        }
    };
}
