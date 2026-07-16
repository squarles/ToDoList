import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import type { Todo } from '@/hooks/use-todos';
import { Spacing } from '@/constants/theme';

type TodoRowProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TodoRow({ todo, onToggle, onRemove }: TodoRowProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <Pressable style={styles.titleArea} onPress={() => onToggle(todo.id)} hitSlop={Spacing.two}>
        <ThemedText themeColor={todo.done ? 'textSecondary' : 'text'} style={todo.done && styles.doneText}>
          {todo.title}
        </ThemedText>
      </Pressable>
      <Pressable onPress={() => onRemove(todo.id)} hitSlop={Spacing.two}>
        <ThemedText themeColor="textSecondary" type="small">
          Delete
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  titleArea: {
    flex: 1,
    marginRight: Spacing.three,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
});
