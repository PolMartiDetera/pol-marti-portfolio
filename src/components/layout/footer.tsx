import Link from "next/link"
import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Pol-Martí de Tera</h3>
            <p className="text-sm text-muted-foreground">
              Estudiant de Batxillerat amb interès en robòtica, programació i disseny 3D.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-3">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Qui Soc
                </Link>
              </li>
              <li>
                <Link href="#robotics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Robotica
                </Link>
              </li>
              <li>
                <Link href="#onshape" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Disseny 3D
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-3">Contacte</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pdeterapujol@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Envelope className="h-4 w-4" />
                  pdeterapujol@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pol-Martí de Tera Pujol. Tots els drets reservats.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/PolMartiDetera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubLogo className="h-5 w-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinLogo className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
