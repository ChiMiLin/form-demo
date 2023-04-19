import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IDetail } from 'src/app/interfaces/資料結構';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [MessageService]
})
export class FormComponent implements OnInit, OnChanges {
  @Input() selectedData: IDetail = {
    no: -1,
    producer: '',
    category: '',
    basePrice: '',
    salePrice: ''
  };
  @Output() actionAdd = new EventEmitter<IDetail>();
  @Output() actionEdit = new EventEmitter<IDetail>();
  @Output() actionClear = new EventEmitter<IDetail>();


  formGroup = new FormGroup({
    producer: new FormControl('', {validators: Validators.required,}),
    category: new FormControl('', {validators: Validators.required,}),
    basePrice: new FormControl('', {validators: this.numberValid()}),
    salePrice: new FormControl('', {validators: this.numberValid()})
  });
  invalidObj: {[key: string]: boolean} = {
    producer: false,
    category: false,
    basePrice: false,
    salePrice: false
  }
  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedData']){
      if(this.selectedData.no != -1){
        const {no, ...other} = this.selectedData;
        this.formGroup.patchValue(other);
      }
    }
  }

  numberValid(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return Number(control.value) ? null: {numberValid: {value: control.value}};
    };
  }

  add(){
    Object.keys(this.formGroup.controls).forEach(key => {
      this.invalidObj[key] = this.formGroup.get(key)?.invalid||false;
    })

    if(this.formGroup.invalid){
      return;
    }

    this.actionAdd.emit({
      no: 0,
      producer: this.formGroup.get('producer')?.value,
      category: this.formGroup.get('category')?.value,
      basePrice: this.formGroup.get('basePrice')?.value,
      salePrice: this.formGroup.get('salePrice')?.value
    });

    this.formGroup.reset();
  }

  edit(){
    if(this.selectedData.no == -1){
      this.messageService.add({severity: 'warn', summary: '警告', detail: '您未選取任何資料進行修改'})
      return;
    }
    this.actionEdit.emit({
      no: this.selectedData.no,
      producer: this.formGroup.get('producer')?.value,
      category: this.formGroup.get('category')?.value,
      basePrice: this.formGroup.get('basePrice')?.value,
      salePrice: this.formGroup.get('salePrice')?.value
    });
    this.formGroup.reset();
  }

  clear(){
    this.actionClear.emit();
  }

}
