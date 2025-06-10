import { NextResponse } from 'next/server';

interface VSLTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail_url?: string;
  // sections?: any[];
}

interface VSLTemplatesData {
    templates: VSLTemplate[];
}

// Ensure mockTemplates is `let` if POST modifies it, otherwise `const` is fine.
// For this example, POST doesn't modify the in-memory store for GET, so `const` is okay.
const mockTemplates: VSLTemplate[] = [
  { id: "vsl_tpl_001", name: "Classic High-Converter", description: "Proven VSL structure with compelling headline, story, strong offer, and clear call to action.", thumbnail_url: "/placeholders/vsl-thumb-1.png" },
  { id: "vsl_tpl_002", name: "Short & Punchy Explainer", description: "Quickly explains a core problem and solution, ideal for cold traffic or simple offers.", thumbnail_url: "/placeholders/vsl-thumb-2.png" },
  { id: "vsl_tpl_003", name: "Webinar Replay VSL", description: "Repurpose your webinar content into an evergreen VSL format for continuous lead generation.", thumbnail_url: "/placeholders/vsl-thumb-3.png" },
  { id: "vsl_tpl_004", name: "Product Demo VSL", description: "Showcases your product in action, highlighting key features and benefits.", thumbnail_url: "/placeholders/vsl-thumb-4.png" },
  { id: "vsl_tpl_005", name: "Challenge Launch VSL", description: "Ideal for multi-day challenges, building anticipation and value before an offer.", thumbnail_url: "/placeholders/vsl-thumb-5.png" },
  { id: "vsl_tpl_006", name: "Case Study VSL", description: "Uses customer success stories to build trust and demonstrate results.", thumbnail_url: "/placeholders/vsl-thumb-6.png" },
];

export async function GET(request: Request) {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ data: { templates: mockTemplates } });
  } catch (error) {
    console.error("Error fetching VSL templates:", error);
    return NextResponse.json({ error: { message: "Error fetching VSL templates" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json() as Partial<Omit<VSLTemplate, 'id'>>;
        if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
            return NextResponse.json({ error: { message: "Template name is required." } }, { status: 400 });
        }
        if (!body.description || typeof body.description !== 'string' || body.description.trim() === '') {
            return NextResponse.json({ error: { message: "Template description is required." } }, { status: 400 });
        }

        const newTemplate: VSLTemplate = {
            id: `vsl_tpl_${String(Date.now()).slice(-5)}_${Math.random().toString(36).substring(2,7)}`,
            name: body.name,
            description: body.description,
            thumbnail_url: body.thumbnail_url || "/placeholders/vsl-thumb-default.png",
        };
        // If you want to persist for the session (won't survive server restart with this mock setup):
        // mockTemplates.push(newTemplate);
        return NextResponse.json({ data: newTemplate }, { status: 201 });

    } catch (error) {
        console.error("Error creating VSL template:", error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: { message: "Invalid JSON payload" } }, { status: 400 });
        }
        return NextResponse.json({ error: { message: "Error creating VSL template" } }, { status: 500 });
    }
}
