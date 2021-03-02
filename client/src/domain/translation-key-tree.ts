export class TranslationKeyTree {
  children: TranslationKeyTree[] = [];

  constructor(
    public key: string,
    public namespace: string,
    public parent: TranslationKeyTree | null,
  ) {}

  addKeyPath(key: string, namespace: string) {
    const [head, ...tail] = key.split('.');

    let node = this.children.find((child) => child.key === head);
    if (!node) {
      node = new TranslationKeyTree(head, namespace, this);
      this.children.push(node);
    }

    if (tail.length > 0) {
      node.addKeyPath(tail.join('.'), namespace);
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
