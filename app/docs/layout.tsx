import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
    return (
        <DocsLayout
            tree={source.getPageTree()}
            githubUrl="https://github.com/StellarStudiosXYZ"
            searchToggle={{ enabled: false }}
            sidebar={{
                tabs: [
                    {
                        title: "Pterodactyl",
                        url: "/docs/pterodactyl",
                    },
                    {
                        title: "Blueprint",
                        url: "/docs/blueprint",
                    },
                    {
                        title: "Paymenter",
                        url: "/docs/paymenter",
                    },
                ],
            }}
            {...baseOptions()}
        >
            {children}
        </DocsLayout>
    );
}
