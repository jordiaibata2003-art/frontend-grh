import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-employe-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./employe-detail.html",
  styleUrls: ["./employe-detail.css"],
})
export class EmployeDetailComponent implements OnInit {
  employe: any = null;

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.employeService.getEmploye(id).subscribe({
      next: (data) => {
        this.employe = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement", err);
      },
    });
  }
}
