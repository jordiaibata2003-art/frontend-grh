import { PdfService } from '../../services/pdf';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { PaieService } from "../../services/paie";

@Component({
  selector: "app-paie-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./paie-list.html",
  styleUrls: ["./paie-list.css"],
})
export class PaieListComponent implements OnInit {
  private pdf = inject(PdfService);

  exporterPdf(): void {
    this.pdf.tableau({
      titre: 'Liste des paies',
      sous: `${this.paiesFiltres.length} paie(s) - montants en FCFA`,
      colonnes: ['Employé', 'Période', 'Base', 'Prime', 'H. sup.', 'Retenues', 'Net', 'Statut'],
      lignes: this.paiesFiltres.map((p: any) => [
        `${p.employe?.prenom ?? ''} ${p.employe?.nom ?? ''}`.trim(),
        `${p.mois}/${p.annee}`, this.pdf.montant(this.pdf.num(p, 'salaireBase', 'salaire_base')), this.pdf.montant(this.pdf.num(p, 'prime')),
        this.pdf.montant(this.pdf.num(p, 'heuresSupplementaires', 'heures_supplementaires')), this.pdf.montant(this.pdf.num(p, 'retenues')), this.pdf.montant(this.pdf.num(p, 'salaireNet', 'salaire_net', 'net')), p.statut,
      ]),
      fichier: 'paies.pdf',
      paysage: true,
      colDroite: [2, 3, 4, 5, 6],
    });
  }

  telechargerBulletin(p: any): void {
    this.pdf.bulletinPaie(p);
  }
  paies: any[] = [];
  recherche: string = "";

  constructor(
    private paieService: PaieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paieService.getPaies().subscribe((data) => (this.paies = data));
  }

  get paiesFiltres() {
    if (!this.recherche) return this.paies;
    const r = this.recherche.toLowerCase();
    return this.paies.filter(
      (p) =>
        p.employe?.nom?.toLowerCase().includes(r) ||
        p.employe?.prenom?.toLowerCase().includes(r) ||
        String(p.mois).includes(r) ||
        String(p.annee).includes(r) ||
        p.statut?.toLowerCase().includes(r),
    );
  }

  modifierPaie(id: number) {
    this.router.navigate(["/paies/edit", id]);
  }
  supprimerPaie(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette paie ?")) {
      this.paieService.deletePaie(id).subscribe(() => {
        this.paies = this.paies.filter((p) => p.id !== id);
      });
    }
  }
}
