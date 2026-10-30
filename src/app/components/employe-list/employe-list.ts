import { PdfService } from '../../services/pdf';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-employe-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./employe-list.html",
  styleUrls: ["./employe-list.css"],
})
export class EmployeListComponent implements OnInit {
  private pdf = inject(PdfService);

  exporterPdf(): void {
    this.pdf.tableau({
      titre: 'Liste des employés',
      sous: `${this.employesFiltres.length} employé(s)`,
      colonnes: ['Matricule', 'Nom', 'Prénom', 'Poste', 'Département', 'Email'],
      lignes: this.employesFiltres.map((e: any) => [e.matricule, e.nom, e.prenom, e.poste, e.departement ?? '', e.email]),
      fichier: 'employes.pdf',
    });
  }

  telechargerAttestation(e: any): void {
    this.pdf.attestationTravail(e);
  }
  employes: any[] = [];
  recherche: string = "";

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.chargerEmployes();
  }

  chargerEmployes(): void {
    this.employeService.getEmployes().subscribe({
      next: (data: any[]) => {
        this.employes = data;
      },
      error: (err: any) => {
        console.error("Erreur lors du chargement des employés", err);
      },
    });
  }

  // 👇 C'EST CE FILTRE QUI RECHERCHE DANS TOUS LES CHAMPS
  get employesFiltres() {
    if (!this.recherche) return this.employes;
    const rechercheLower = this.recherche.toLowerCase();
    return this.employes.filter(
      (e) =>
        e.nom?.toLowerCase().includes(rechercheLower) ||
        e.prenom?.toLowerCase().includes(rechercheLower) ||
        e.poste?.toLowerCase().includes(rechercheLower) ||
        e.email?.toLowerCase().includes(rechercheLower) ||
        e.departement?.toLowerCase().includes(rechercheLower) ||
        e.adresse?.toLowerCase().includes(rechercheLower) ||
        e.telephone?.includes(this.recherche),
    );
  }

  supprimerEmploye(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      this.employeService.deleteEmploye(id).subscribe({
        next: () => {
          this.employes = this.employes.filter((e) => e.id !== id);
        },
        error: (err: any) => {
          console.error("Erreur lors de la suppression", err);
        },
      });
    }
  }

  modifierEmploye(id: number): void {
    window.location.href = `/employes/edit/${id}`;
  }
}
