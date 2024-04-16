class ArbreView {
  constructor(props) {
    this.props = props;
  }

  // Fonction pour rendre un nœud de l'arbre
  renderTreeNode(node) {
    const li = document.createElement('li');
    li.textContent = `Profondeur: ${node.getDepth()}, État: ${node.getState()}`;
    
    const ul = document.createElement('ul');
    node.getChildren().forEach(child => {
      const childLi = this.renderTreeNode(child);
      ul.appendChild(childLi);
    });

    li.appendChild(ul);
    return li;
  }

  // Fonction pour afficher le dialogue
  showDialog() {
    const { open, onClose, rootNode } = this.props;

    const dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.style.display = open ? 'block' : 'none';

    const dialogTitle = document.createElement('div');
    dialogTitle.textContent = 'Arbre de recherche';
    dialog.appendChild(dialogTitle);

    const dialogContent = document.createElement('div');
    dialogContent.className = 'content';
    const ul = document.createElement('ul');
    ul.appendChild(this.renderTreeNode(rootNode));
    dialogContent.appendChild(ul);
    dialog.appendChild(dialogContent);

    const dialogActions = document.createElement('div');
    dialogActions.className = 'actions';
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fermer';
    closeButton.addEventListener('click', onClose);
    dialogActions.appendChild(closeButton);
    dialog.appendChild(dialogActions);

    document.body.appendChild(dialog);
  }

  // Fonction pour fermer le dialogue
  closeDialog() {
    const dialog = document.querySelector('.dialog');
    if (dialog) {
      document.body.removeChild(dialog);
    }
  }
}