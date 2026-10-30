import { PdfService } from '../../services/pdf';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { ContratService } from "../../services/contrat";

@Component({
  selector: "app-contrat-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./contrat-list.html",
  styleUrls: ["./contrat-list.css"],
})
export class ContratListComponent implements OnInit {
  private pdf = inject(PdfService);

  exporterPdf(): void {
    this.pdf.tableau({
      titre: 'Liste des contrats',
      sous: `${this.contratsFiltres.length} contrat(s)`,
      colonnes: ['Employé', 'Type', 'Début', 'Fin', 'Salaire (FCFA)', 'Statut'],
      lignes: this.contratsFiltres.map((c: any) => [
        `${c.employe?.prenom ?? ''} ${c.employe?.nom ?? ''}`.trim(),
        c.typeContrat, this.pdf.date(c.dateDebut), c.dateFin ? this.pdf.date(c.dateFin) : 'En cours',
        this.pdf.montant(c.salaire), c.statut,
      ]),
      fichier: 'contrats.pdf',
      colDroite: [4],
    });
  }
  contrats: any[] = [];
  recherche: string = "";

  constructor(
    private contratService: ContratService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.chargerContrats();
  }

  chargerContrats(): void {
    this.contratService.getContrats().subscribe({
      next: (data: any[]) => {
        this.contrats = data;
      },
      error: (err: any) => {
        console.error("Erreur lors du chargement des contrats", err);
      },
    });
  }

  get contratsFiltres() {
    if (!this.recherche) return this.contrats;
    const rechercheLower = this.recherche.toLowerCase();
    return this.contrats.filter(
      (c) =>
        c.employe?.nom?.toLowerCase().includes(rechercheLower) ||
        c.employe?.prenom?.toLowerCase().includes(rechercheLower) ||
        c.typeContrat?.toLowerCase().includes(rechercheLower) ||
        c.statut?.toLowerCase().includes(rechercheLower),
    );
  }

  supprimerContrat(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce contrat ?")) {
      this.contratService.deleteContrat(id).subscribe({
        next: () => {
          this.contrats = this.contrats.filter((c) => c.id !== id);
        },
        error: (err: any) => {
          console.error("Erreur lors de la suppression", err);
        },
      });
    }
  }

  modifierContrat(id: number): void {
    this.router.navigate(["/contrats/edit", id]);
  }
}
