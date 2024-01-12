import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Colors } from '@models/colors.model';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
//importar en el modulo-> ReactiveFormsModule
export class BoardFormComponent {

  constructor(private formBuiler: FormBuilder, private boardsService: BoardsService, private router: Router) {}

  @Output() closeOverlay = new EventEmitter<boolean>();

  form = this.formBuiler.nonNullable.group({
    title: ['',[Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })
  
  doSave() {
    if (this.form.valid) {
      const {title, backgroundColor} = this.form.getRawValue();
      this.boardsService.createBoard(title, backgroundColor).subscribe(board => {
        this.closeOverlay.emit(false);
        // this.closeOverlay.next(false);
        this.router.navigate(['app/boards', board.id])
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
