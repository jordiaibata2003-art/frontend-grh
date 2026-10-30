import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { PaieService } from "../../services/paie";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-paie-add",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./paie-add.html",
  styleUrls: ["./paie-add.css"],
})
export class PaieAddComponent implements OnInit {
  paie: any = {};
  employes: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private paieService: PaieService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeService
      .getEmployes()
      .subscribe((data) => (this.employes = data));
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEditMode = true;
      this.paieService.getPaie(id).subscribe((data) => (this.paie = data));
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.paieService.updatePaie(this.paie.id, this.paie).subscribe(() => {
        this.router.navigate(["/paies"]);
      });
    } else {
      this.paieService.addPaie(this.paie).subscribe(() => {
        this.router.navigate(["/paies"]);
      });
    }
  }
}
