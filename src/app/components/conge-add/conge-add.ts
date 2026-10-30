import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CongeService } from '../../services/conge';
import { EmployeService } from '../../services/employe';

@Component({
  selector: 'app-conge-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './conge-add.html',
  styleUrls: ['./conge-add.css']
})
export class CongeAddComponent implements OnInit {

  conge: any = {};
  employes: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private congeService: CongeService,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe(data => this.employes = data);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.congeService.getConge(id).subscribe(data => this.conge = data);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.congeService.updateConge(this.conge.id, this.conge).subscribe(() => {
        this.router.navigate(['/conges']);
      });
    } else {
      this.congeService.addConge(this.conge).subscribe(() => {
        this.router.navigate(['/conges']);
      });
    }
  }
}