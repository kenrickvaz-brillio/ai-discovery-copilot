export interface MockFile {
  id: string;
  name: string;
  type: 'RFP' | 'Transcript' | 'Email thread' | 'Existing doc' | 'Interview notes';
  extension: string;
  size: string;
  addedBy: string;
  timestamp: string;
  content: string;
  included: boolean;
}

export const SAMPLE_FILES: MockFile[] = [
  {
    id: '1',
    name: 'RFP_MemberPortal_Modernization',
    type: 'RFP',
    extension: 'txt',
    size: '45 KB',
    addedBy: 'Sarah Jenkins',
    timestamp: '2026-01-05 09:15',
    included: true,
    content: `REQUEST FOR PROPOSAL: HealthPlan+ Member Portal Modernization

1. Executive Summary
HealthPlan+ is seeking a partner to modernize our aging member portal. The current system is 12 years old and suffers from high bounce rates and low mobile engagement.

2. Key Requirements
- Modern, responsive UI/UX.
- Integration with legacy CRM (Oracle).
- HIPAA compliance is non-negotiable.
- Real-time claims status tracking.
- Secure messaging with providers.
- SSO integration with existing employee systems.

3. Constraints
- Must be live in 6 months.
- Budget: $1.2M.
- Must support IE11 (legacy requirement from corporate partners).
- Zero downtime migration from the old portal.`
  },
  {
    id: '2',
    name: 'Stakeholder_Interview_ProductLead',
    type: 'Interview notes',
    extension: 'txt',
    size: '12 KB',
    addedBy: 'Mike Chen',
    timestamp: '2026-01-06 14:20',
    included: true,
    content: `Stakeholder: David Miller (Product Lead)
Date: Jan 6, 2026

Key Takeaways:
- "Our biggest pain point is the login flow. 30% of our call center volume is just password resets."
- "The mobile experience is non-existent. It's just a wrapped web view that breaks constantly."
- "We need to see a 20% increase in digital self-service for claims."
- "I'm worried about the legacy CRM integration. It's brittle."`
  },
  {
    id: '3',
    name: 'Call_Transcript_DiscoverySession1',
    type: 'Transcript',
    extension: 'txt',
    size: '85 KB',
    addedBy: 'Auto-Recorder',
    timestamp: '2026-01-07 11:00',
    included: true,
    content: `[00:05:12] Sarah: We need to make sure the new portal is intuitive.
[00:05:20] David: Define 'intuitive'.
[00:05:25] Sarah: Like, a member should be able to find their ID card in two clicks.
[00:06:45] Tech Lead: The legacy API only responds in 2 seconds on a good day. We might need a caching layer.
[00:08:10] Sarah: We also need to support Spanish and Mandarin from day one.
[00:15:30] David: I want a dashboard that shows 'Health Score' but we don't have the data for that yet. Let's put it in 'Could Have'.`
  },
  {
    id: '4',
    name: 'EmailThread_SupportPainPoints',
    type: 'Email thread',
    extension: 'eml',
    size: '28 KB',
    addedBy: 'Sarah Jenkins',
    timestamp: '2026-01-07 16:45',
    included: true,
    content: `From: Support Lead <support@healthplanplus.com>
To: Project Team
Subject: Re: Member Portal Pain Points

Team, here are the top 3 complaints from the last quarter:
1. "I can't see why my claim was denied."
2. "The search function for doctors returns results 50 miles away."
3. "The site times out after 2 minutes of inactivity."

We need to fix these in the new version. Especially the timeout—it's too aggressive.`
  },
  {
    id: '5',
    name: 'Existing_Architecture_Notes',
    type: 'Existing doc',
    extension: 'txt',
    size: '15 KB',
    addedBy: 'Tech Lead',
    timestamp: '2026-01-04 10:00',
    included: false,
    content: `Current Stack:
- Frontend: ASP.NET Web Forms
- Backend: Java 8 Monolith
- Database: Oracle 11g
- Auth: Custom LDAP wrapper

Note: The Oracle DB is reaching end-of-life support next year. We should consider a migration strategy.`
  },
  {
    id: '6',
    name: 'Security_Compliance_Requirements',
    type: 'Existing doc',
    extension: 'txt',
    size: '22 KB',
    addedBy: 'Compliance Officer',
    timestamp: '2026-01-03 15:30',
    included: true,
    content: `Mandatory Compliance:
- HIPAA / HITECH
- SOC2 Type II
- Multi-factor Authentication (MFA) for all logins.
- Audit logs for every PII access.
- Encryption at rest and in transit (TLS 1.3).`
  }
];

export const MESSY_EXCERPTS = {
  low: "Standard professional documentation with minor typos.",
  medium: "Includes some contradictory requirements and missing context.",
  high: "Highly chaotic. Multiple stakeholders disagreeing, vague requirements like 'make it pop', and conflicting technical specs (e.g., 'must be offline' vs 'real-time only')."
};
