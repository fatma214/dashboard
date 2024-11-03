import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'  
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  get pageNumbers(): (number | string)[] {
    const pageNumbers: (number | string)[] = [];
    const siblingsCount = 1;
    const totalButtons = 7;

    pageNumbers.push(1);

    if (this.totalPages <= totalButtons) {
      for (let i = 2; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let leftSibling = Math.max(this.currentPage - siblingsCount, 2);
      let rightSibling = Math.min(this.currentPage + siblingsCount, this.totalPages - 1);

      const shouldShowLeftDots = leftSibling > 2;
      const shouldShowRightDots = rightSibling < this.totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        leftSibling = 2;
        for (let i = leftSibling; i <= leftSibling + 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pageNumbers.push('...');
        for (let i = this.totalPages - 4; i <= this.totalPages - 1; i++) {
          pageNumbers.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pageNumbers.push('...');
        for (let i = leftSibling; i <= rightSibling; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
      }
    }

    if (pageNumbers[pageNumbers.length - 1] !== this.totalPages) {
      pageNumbers.push(this.totalPages);
    }

    return pageNumbers;
  }

  onPageChange(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}