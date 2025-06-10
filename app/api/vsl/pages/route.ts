import { NextResponse } from 'next/server';

interface VSLPageStat {
  views: number;
  conversions: number;
}
interface VSLPageEntry {
  page_id: string;
  title: string;
  template_id: string;
  template_name: string;
  status: 'Draft' | 'Published' | 'Archived';
  stats: VSLPageStat;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  live_url?: string;
}

interface VSLPagesData {
    pages: VSLPageEntry[];
}

let mockVSLPages: VSLPageEntry[] = [
  { page_id: "vslp_001", title: "My First VSL Campaign (Product A Launch)", template_id: "vsl_tpl_001", template_name: "Classic High-Converter", status: "Published", stats: { views: 12560, conversions: 870 }, created_at: "2023-11-10T10:00:00Z", updated_at: "2023-11-11T14:00:00Z", live_url: "/vsl/p/product-a-launch" },
  { page_id: "vslp_002", title: "Webinar Replay Offer VSL", template_id: "vsl_tpl_003", template_name: "Webinar Replay VSL", status: "Published", stats: { views: 8750, conversions: 430 }, created_at: "2023-10-25T10:00:00Z", updated_at: "2023-10-26T14:00:00Z", live_url: "/vsl/p/webinar-replay-offer" },
  { page_id: "vslp_003", title: "New Service Explainer (Draft)", template_id: "vsl_tpl_002", template_name: "Short & Punchy Explainer", status: "Draft", stats: { views: 0, conversions: 0 }, created_at: "2023-11-15T09:00:00Z", updated_at: "2023-11-15T09:00:00Z" },
  { page_id: "vslp_004", title: "Archived Product Teaser", template_id: "vsl_tpl_004", template_name: "Product Demo VSL", status: "Archived", stats: { views: 5500, conversions: 150 }, created_at: "2023-09-01T00:00:00Z", updated_at: "2023-09-10T00:00:00Z" },
];

export async function GET(request: Request) {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    // In a real app, you might filter by user ID or team
    return NextResponse.json({ data: { pages: mockVSLPages } });
  } catch (error) {
    console.error("Error fetching VSL pages:", error);
    return NextResponse.json({ error: { message: "Error fetching VSL pages" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json() as { title: string; template_id: string; template_name: string }; // Simplified body for creation

        if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
            return NextResponse.json({ error: { message: "Page title is required." } }, { status: 400 });
        }
        if (!body.template_id || typeof body.template_id !== 'string') {
            return NextResponse.json({ error: { message: "template_id is required." } }, { status: 400 });
        }
         if (!body.template_name || typeof body.template_name !== 'string') {
            return NextResponse.json({ error: { message: "template_name is required." } }, { status: 400 });
        }


        const newPage: VSLPageEntry = {
            page_id: `vslp_${String(Date.now()).slice(-5)}_${Math.random().toString(36).substring(2,7)}`,
            title: body.title,
            template_id: body.template_id,
            template_name: body.template_name,
            status: 'Draft',
            stats: { views: 0, conversions: 0 },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            live_url: `/vsl/p/${body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0,50)}` // Basic slugify
        };
        mockVSLPages.unshift(newPage); // Add to the beginning for most recent first
        return NextResponse.json({ data: newPage }, { status: 201 });
    } catch (error) {
        console.error("Error creating VSL page:", error);
        if (error instanceof SyntaxError) { // Check for JSON parsing errors
            return NextResponse.json({ error: { message: "Invalid JSON payload" } }, { status: 400 });
        }
        return NextResponse.json({ error: { message: "Error creating VSL page" } }, { status: 500 });
    }
}

export async function PUT(request: Request) { // For updating status, title, etc.
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    if (!pageId) {
        return NextResponse.json({ error: { message: "pageId query parameter is required for updates." } }, { status: 400 });
    }

    try {
        const body = await request.json() as Partial<Omit<VSLPageEntry, 'page_id' | 'template_id' | 'template_name' | 'created_at' | 'stats'>>;

        if (body.title && (typeof body.title !== 'string' || body.title.trim() === '')) {
             return NextResponse.json({ error: { message: "Page title must be a non-empty string if provided." } }, { status: 400 });
        }
        if (body.status && !['Draft', 'Published', 'Archived'].includes(body.status)) {
            return NextResponse.json({ error: { message: "Invalid status provided. Must be 'Draft', 'Published', or 'Archived'." } }, { status: 400 });
        }

        const pageIndex = mockVSLPages.findIndex(p => p.page_id === pageId);
        if (pageIndex === -1) {
            return NextResponse.json({ error: { message: "VSL Page not found." } }, { status: 404 });
        }

        mockVSLPages[pageIndex] = {
            ...mockVSLPages[pageIndex],
            ...body,
            updated_at: new Date().toISOString()
        };

        return NextResponse.json({ data: mockVSLPages[pageIndex] });
    } catch (error) {
         console.error("Error updating VSL page:", error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: { message: "Invalid JSON payload" } }, { status: 400 });
        }
        return NextResponse.json({ error: { message: "Error updating VSL page" } }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    if (!pageId) {
        return NextResponse.json({ error: { message: "pageId query parameter is required." } }, { status: 400 });
    }

    const initialLength = mockVSLPages.length;
    mockVSLPages = mockVSLPages.filter(p => p.page_id !== pageId);

    if (mockVSLPages.length === initialLength) {
        return NextResponse.json({ error: { message: "VSL Page not found." } }, { status: 404 });
    }
    return NextResponse.json({ data: { message: "VSL Page deleted successfully." } });
}
