export class TranslationKeyTree {
  children: TranslationKeyTree[] = [];

  constructor(public key: string, public parent: TranslationKeyTree | null) {}

  addKeyPath(key: string) {
    const [head, ...tail] = key.split('.');

    let node = this.children.find((child) => child.key === head);
    if (!node) {
      node = new TranslationKeyTree(head, this);
      this.children.push(node);
    }

    if (tail.length > 0) {
      node.addKeyPath(tail.join('.'));
    }

    this.children.sort((a, b) => a.key.localeCompare(b.key));
  }

  getKeyPath(): string {
    if (!this.parent) {
      return this.key;
    }

    return this.parent.getKeyPath() + '.' + this.key;
  }
}
