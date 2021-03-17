import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TreeItem, TreeView } from "@material-ui/lab";
import React from "react";
import { TranslationKeyTree } from "../../domain/translation-key-tree";

interface TranslationKeysTreeViewProps {
  translationKeysTrees: TranslationKeyTree[];
  selectedKey: string;
  selectedNamespace: string;
  onKeySelect: (key: string) => void;
}

export const TranslationKeysTreeView: React.FC<TranslationKeysTreeViewProps> = ({
  translationKeysTrees,
  selectedKey,
  selectedNamespace,
  onKeySelect,
}) => {
  const treeItems = React.useMemo(() => {
    const renderTree = (node: TranslationKeyTree) => (
      <TreeItem
        key={[node.namespace, node.getKeyPath()].join("_")}
        nodeId={[node.namespace, node.getKeyPath()].join("_")}
        label={node.key}
        onLabelClick={(event) => {
          event.preventDefault();
          onKeySelect(node.getKeyPath());
        }}
      >
        {Array.isArray(node.children)
          ? node.children.map((n) => renderTree(n))
          : null}
      </TreeItem>
    );

    return translationKeysTrees.map(renderTree);
  }, [translationKeysTrees, onKeySelect]);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={[selectedNamespace, selectedKey].join("_")}
    >
      {treeItems}
    </TreeView>
  );
};
