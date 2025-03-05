import {Category} from '../types/category.type';

export const categories: Category[] = [
  {
    id: 1,
    category: 'Men'
  },
  {
    id: 2,
    category: 'Women'
  },
  {
    id: 3,
    category: 'Kids'
  },
  {
    id: 4,
    category: 'Party wear',
    parent_category_id: 2
  },
  {
    id: 5,
    category: 'Foot wear',
    parent_category_id: 2
  },
  {
    id: 6,
    category: 'Accessories',
    parent_category_id: 3
  },
  {
    id: 7,
    category: 'Formal wear',
    parent_category_id: 1
  },
]
