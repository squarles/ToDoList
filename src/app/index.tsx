import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TodoRow } from '@/components/todo-row';
import { BottomTabInset, MaxContentWidth, Spacing, TopTabBarInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTodos } from '@/hooks/use-todos';

export default function HomeScreen() {
  const theme = useTheme();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [draft, setDraft] = useState('');

  const remaining = todos.filter((todo) => !todo.done).length;

  function handleAdd() {
    addTodo(draft);
    setDraft('');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          To-Do List
        </ThemedText>

        <ThemedText type="small" themeColor="textSecondary">
          {todos.length === 0 ? 'Nothing on your list yet' : `${remaining} of ${todos.length} remaining`}
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.inputRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={handleAdd}
            placeholder="Add a to-do"
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
            returnKeyType="done"
          />
          <Pressable onPress={handleAdd} hitSlop={Spacing.two}>
            <ThemedText type="linkPrimary">Add</ThemedText>
          </Pressable>
        </ThemedView>

        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <TodoRow todo={item} onToggle={toggleTodo} onRemove={removeTodo} />}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
    paddingTop: TopTabBarInset + Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    alignSelf: 'stretch',
  },
  listContent: {
    gap: Spacing.two,
  },
});
