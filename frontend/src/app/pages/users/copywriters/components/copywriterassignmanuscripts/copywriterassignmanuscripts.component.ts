import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CopywriterService } from '../../../copywriter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-copywriterassignmanuscripts',
  templateUrl: './copywriterassignmanuscripts.component.html',
  styleUrls: ['./copywriterassignmanuscripts.component.scss']
})
export class CopywriterassignmanuscriptsComponent implements OnInit {

  private subscription = new Map<String, Subscription>();
  id: number;
  manuscripts: any;

  constructor(private route: ActivatedRoute,
    private copyWriterService: CopywriterService) { }

  ngOnInit() {
    this.subscription.set('routeSubscription', this.route.
    params.subscribe(params => {
      this.id = +params['id'];
    }));

    this.assignedManuscripts();
  }

  assignedManuscripts() {
    this.subscription.set('assignedManuscripts', this.copyWriterService
    .getManuscripts(this.id)
    .subscribe(res => {
      this.manuscripts = res;
    }));
  }

}
