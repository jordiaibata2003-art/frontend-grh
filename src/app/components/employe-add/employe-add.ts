import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-employe-add",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./employe-add.html",
  styleUrls: ["./employe-add.css"],
})
export class EmployeAddComponent implements OnInit {
  employe: any = {};
  isEditMode: boolean = false;

  constructor(
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEditMode = true;
      this.employeService.getEmploye(id).subscribe({
        next: (data) => {
          this.employe = data;
        },
        error: () => {
          alert("Employé non trouvé");
          this.router.navigate(["/employes"]);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeService
        .updateEmploye(this.employe.id, this.employe)
        .subscribe({
          next: () => {
            this.router.navigate(["/employes"]);
          },
          error: () => {
            alert("Erreur lors de la mise à jour");
          },
        });
    } else {
      this.employeService.addEmploye(this.employe).subscribe({
        next: () => {
          this.router.navigate(["/employes"]);
        },
        error: () => {
          alert("Erreur lors de l'ajout");
        },
      });
    }
  }
}
