export function getSubheading(numberOfTask) {
  if (numberOfTask > 4) {
    return `${numberOfTask} zadań`;
  } else if (numberOfTask <= 4 && numberOfTask >= 2) {
    return `${numberOfTask} zadania`;
  } else if (numberOfTask === 1) {
    return '1 zadanie';
  } else return 'Brak zadań';
}