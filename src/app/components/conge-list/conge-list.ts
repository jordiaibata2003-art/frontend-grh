import { PdfService } from '../../services/pdf';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { CongeService } from "../../services/conge";

@Component({
  selector: "app-conge-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./conge-list.html",
  styleUrls: ["./conge-list.css"],
})
export class CongeListComponent implements OnInit {
  private pdf = inject(PdfService);

  exporterPdf(): void {
    this.pdf.tableau({
      titre: 'Liste des congés',
      sous: `${this.congesFiltres.length} congé(s)`,
      colonnes: ['Employé', 'Type', 'Début', 'Fin', 'Statut'],
      lignes: this.congesFiltres.map((c: any) => [
        `${c.employe?.prenom ?? ''} ${c.employe?.nom ?? ''}`.trim(),
        c.type, this.pdf.date(c.dateDebut), this.pdf.date(c.dateFin), String(c.statut ?? '').replace('_', ' '),
      ]),
      fichier: 'conges.pdf',
    });
  }
  conges: any[] = [];
  recherche: string = "";

  constructor(
    private congeService: CongeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.congeService.getConges().subscribe((data) => (this.conges = data));
  }

  get congesFiltres() {
    if (!this.recherche) return this.conges;
    const r = this.recherche.toLowerCase();
    return this.conges.filter(
      (c) =>
        c.employe?.nom?.toLowerCase().includes(r) ||
        c.employe?.prenom?.toLowerCase().includes(r) ||
        c.type?.toLowerCase().includes(r) ||
        c.statut?.toLowerCase().includes(r),
    );
  }

  modifierConge(id: number) {
    this.router.navigate(["/conges/edit", id]);
  }
  supprimerConge(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce congé ?")) {
      this.congeService.deleteConge(id).subscribe(() => {
        this.conges = this.conges.filter((c) => c.id !== id);
      });
    }
  }
}
