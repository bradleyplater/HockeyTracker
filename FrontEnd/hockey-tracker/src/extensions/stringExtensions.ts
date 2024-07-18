declare interface String {
  toTitleCase(): string;
}

String.prototype.toTitleCase = function (this: string) {
  return this.toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
