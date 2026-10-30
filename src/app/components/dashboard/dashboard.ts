import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeService } from "../../services/employe";
import { ContratService } from "../../services/contrat";
import { CongeService } from "../../services/conge";
import { PaieService } from "../../services/paie";
import { PresenceService } from "../../services/presence";
import { PdfService } from "../../services/pdf";

interface Segment { label: string; count: number; color: string; }

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard.html",
  styleUrls: ["./dashboard.css"],
})
export class DashboardComponent implements OnInit {
  totalEmployes = 0;
  totalContrats = 0;
  totalConges = 0;
  totalPaies = 0;
  totalPresences = 0;
  masseLabel = "0";
  masseTotaleLabel = "0";

  contratsParType: Segment[] = [];
  congesParStatut: Segment[] = [];
  presencesParStatut: Segment[] = [];
  congesEnAttente: any[] = [];
  derniersEmployes: any[] = [];

  salutation = "";
  dateLabel = "";

  quickLinks = [
    { label: "Employés", route: "/employes", icon: "fas fa-users", color: "#4f46e5" },
    { label: "Contrats", route: "/contrats", icon: "fas fa-file-contract", color: "#059669" },
    { label: "Congés", route: "/conges", icon: "fas fa-calendar-alt", color: "#d97706" },
    { label: "Paies", route: "/paies", icon: "fas fa-money-bill-wave", color: "#dc2626" },
    { label: "Présences", route: "/presences", icon: "fas fa-clock", color: "#0891b2" },
  ];

  private readonly palette = ["#4f46e5", "#0891b2", "#d97706", "#64748b", "#10b981", "#ef4444", "#7c3aed"];

  constructor(
    private employeService: EmployeService,
    private contratService: ContratService,
    private congeService: CongeService,
    private paieService: PaieService,
    private presenceService: PresenceService,
    private pdf: PdfService,
  ) {}

  ngOnInit(): void {
    const now = new Date();
    let nom = "";
    try {
      const u = JSON.parse(localStorage.getItem("utilisateur") || "null");
      nom = u?.prenom || u?.nom || "";
    } catch { /* ignoré */ }
    this.salutation = (now.getHours() < 18 ? "Bonjour" : "Bonsoir") + (nom ? " " + nom : "");
    const d = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    this.dateLabel = d.charAt(0).toUpperCase() + d.slice(1);

    this.employeService.getEmployes().subscribe((raw: any) => {
      const data = this.liste(raw);
      this.totalEmployes = data.length;
      const dt = (x: any) => new Date(x.dateEmbauche ?? x.date_embauche ?? 0).getTime();
      this.derniersEmployes = [...data].sort((a, b) => dt(b) - dt(a)).slice(0, 5);
    });

    this.contratService.getContrats().subscribe((raw: any) => {
      const data = this.liste(raw);
      this.totalContrats = data.length;
      this.contratsParType = this.grouper(data, ["typeContrat", "type_contrat", "type"], {
        cdi: ["CDI", "#4f46e5"], cdd: ["CDD", "#0891b2"], vacataire: ["Vacataire", "#d97706"], stage: ["Stage", "#64748b"],
      });
    });

    this.congeService.getConges().subscribe((raw: any) => {
      const data = this.liste(raw);
      this.totalConges = data.length;
      this.congesParStatut = this.grouper(data, ["statut"], {
        enattente: ["En attente", "#f59e0b"], valide: ["Validés", "#10b981"], refuse: ["Refusés", "#ef4444"],
      });
      this.congesEnAttente = data.filter((x) => this.norm(x.statut) === "enattente").slice(0, 5);
    });

    this.paieService.getPaies().subscribe((raw: any) => {
      const data = this.liste(raw);
      this.totalPaies = data.length;
      const net = (x: any) => {
        const n = this.pdf.num(x, "salaireNet", "salaire_net", "net");
        if (n) return n;
        return this.pdf.num(x, "salaireBase", "salaire_base") + this.pdf.num(x, "prime")
          + this.pdf.num(x, "heuresSupplementaires", "heures_supplementaires") - this.pdf.num(x, "retenues");
      };
      this.masseLabel = this.pdf.montant(data.filter((x) => this.norm(x.statut) === "valide").reduce((s, x) => s + net(x), 0));
      this.masseTotaleLabel = this.pdf.montant(data.reduce((s, x) => s + net(x), 0));
    });

    this.presenceService.getPresences().subscribe((raw: any) => {
      const data = this.liste(raw);
      this.totalPresences = data.length;
      this.presencesParStatut = this.grouper(data, ["statut"], {
        present: ["Présents", "#10b981"], retard: ["Retards", "#f59e0b"], absent: ["Absents", "#ef4444"],
      });
    });
  }

  /** Accepte un tableau ou une réponse enveloppée { data: [...] } */
  private liste(raw: any): any[] {
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data;
    return [];
  }

  /** Minuscules, sans accents, sans espaces ni _ ni - */
  private norm(v: any): string {
    return String(v ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[\s_-]+/g, "");
  }

  /** Regroupe sur les valeurs réelles ; les valeurs inconnues deviennent une ligne à part */
  private grouper(data: any[], champs: string[], connus: Record<string, [string, string]>): Segment[] {
    const m = new Map<string, Segment>();
    for (const x of data) {
      let v: any = "";
      for (const k of champs) { if (x?.[k]) { v = x[k]; break; } }
      const key = this.norm(v) || "nondefini";
      if (!m.has(key)) {
        const c = connus[key];
        m.set(key, { label: c ? c[0] : (String(v) || "Non défini"), color: c ? c[1] : this.palette[m.size % this.palette.length], count: 0 });
      }
      m.get(key)!.count++;
    }
    // Les valeurs attendues sans occurrence restent visibles à 0
    for (const [key, c] of Object.entries(connus)) {
      if (!m.has(key)) m.set(key, { label: c[0], color: c[1], count: 0 });
    }
    return [...m.values()];
  }

  total(segs: Segment[]): number {
    return segs.reduce((s, x) => s + x.count, 0);
  }

  pct(s: Segment, segs: Segment[]): number {
    const t = this.total(segs);
    return t ? Math.round((s.count / t) * 100) : 0;
  }

  donut(segs: Segment[]): string {
    const t = this.total(segs);
    if (!t) return "#e5e9f0";
    let acc = 0;
    const parts = segs
      .filter((s) => s.count > 0)
      .map((s) => {
        const start = acc;
        acc += (s.count / t) * 100;
        return `${s.color} ${start}% ${acc}%`;
      });
    return `conic-gradient(${parts.join(", ")})`;
  }

  exporterRapport(): void {
    const lignes = (segs: Segment[]) => segs.map((s) => [s.label, s.count] as (string | number)[]);
    this.pdf.rapportRH({
      stats: [
        ["Employés", this.totalEmployes],
        ["Contrats", this.totalContrats],
        ["Congés", this.totalConges],
        ["Paies", this.totalPaies],
        ["Présences", this.totalPresences],
        ["Masse salariale (paies validées)", this.masseLabel + " FCFA"],
        ["Masse salariale (toutes les paies)", this.masseTotaleLabel + " FCFA"],
      ],
      sections: [
        { titre: "Contrats par type", lignes: lignes(this.contratsParType) },
        { titre: "Congés par statut", lignes: lignes(this.congesParStatut) },
        { titre: "Présences par statut", lignes: lignes(this.presencesParStatut) },
      ],
    });
  }
}