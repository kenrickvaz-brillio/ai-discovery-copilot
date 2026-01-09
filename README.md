# AI Discovery Copilot

A frontend-only web app demo that simulates an AI-powered discovery workflow.

**Live Demo:** [https://wonderful-rock-05024b71e.2.azurestaticapps.net](https://wonderful-rock-05024b71e.2.azurestaticapps.net)

## Features
- **Project Management**: View recent projects and start new ones.
- **Discovery Wizard**:
  - **Inputs**: Upload messy documents (simulated), adjust messiness, and set data sensitivity.
  - **Configure**: Set industry, product type, timeline, and constraints.
  - **Generate**: Watch the AI synthesize data with a real-time progress timeline and extraction logs.
- **Discovery Brief**:
  - **Structured Output**: Executive summary, problem statements, personas, NFRs, and more.
  - **Traceability**: See exactly where each statement came from with evidence snippets and confidence scores.
  - **Opportunity Sizing**: Interactive ROI calculator with adjustable assumptions.
- **Demo Mode**: One-click auto-fill to run the demo quickly.
- **Presenter Notes**: Built-in talk track for live demonstrations.

## Tech Stack
- React + TypeScript
- Vite
- Zustand (State Management)
- Lucide React (Icons)
- Vanilla CSS (Design System)

## How to Run
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Demo Script
1. **Landing**: Start on the Landing page. Mention the goal: "From messy inputs to structured clarity."
2. **Inputs**: Click "New Discovery". Show the sample files. Adjust the "Messiness Slider" to High and explain how it simulates real-world data chaos.
3. **Configure**: Move to the Configure step. Select "Healthcare" and "Member Portal". Toggle "Accessibility AA required" and "Cloud-first".
4. **Generate**: Click "Generate Discovery Brief". Point out the extraction logs and the traceability meter as it builds the brief.
5. **Review**: Once generated, explore the "Problem Statements". Click one to show the "Traceability Panel" on the right.
6. **ROI**: Go to the "Opportunity Sizing" section. Move the sliders to show how the ROI changes based on member count and deflection rate.
7. **Export**: Mention that the brief can be exported to PDF or shared with stakeholders.
