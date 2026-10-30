import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { PresenceService } from "../../services/presence";
import { EmployeService } from "../../services/employe";

@Component({
  selector: "app-presence-add",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./presence-add.html",
  styleUrls: ["./presence-add.css"],
})
export class PresenceAddComponent implements OnInit {
  presence: any = {};
  employes: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private presenceService: PresenceService,
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
      this.presenceService
        .getPresence(id)
        .subscribe((data) => (this.presence = data));
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.presenceService
        .updatePresence(this.presence.id, this.presence)
        .subscribe(() => {
          this.router.navigate(["/presences"]);
        });
    } else {
      this.presenceService.addPresence(this.presence).subscribe(() => {
        this.router.navigate(["/presences"]);
      });
    }
  }
}
