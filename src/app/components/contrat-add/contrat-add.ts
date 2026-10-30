import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ContratService } from "../../services/contrat";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-contrat-add",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./contrat-add.html",
  styleUrls: ["./contrat-add.css"],
})
export class ContratAddComponent implements OnInit {
  contrat: any = {};
  employes: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private contratService: ContratService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe({
      next: (data) => {
        this.employes = data;
      },
      error: () => {
        alert("Erreur lors du chargement des employés");
      },
    });

    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEditMode = true;
      this.contratService.getContrat(id).subscribe({
        next: (data) => {
          this.contrat = data;
        },
        error: () => {
          alert("Contrat non trouvé");
          this.router.navigate(["/contrats"]);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.contratService
        .updateContrat(this.contrat.id, this.contrat)
        .subscribe({
          next: () => {
            this.router.navigate(["/contrats"]);
          },
          error: () => {
            alert("Erreur lors de la mise à jour");
          },
        });
    } else {
      this.contratService.addContrat(this.contrat).subscribe({
        next: () => {
          this.router.navigate(["/contrats"]);
        },
        error: () => {
          alert("Erreur lors de l'ajout");
        },
      });
    }
  }
}
