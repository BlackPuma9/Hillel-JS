# Home Work 65. Працюємо з Map

Завдання:

1. Ініціалізація менеджера завдань: Створіть клас TaskManager, який використовує Map для зберігання завдань. Кожне завдання має унікальний ідентифікатор (ID) та опис.
2. Додавання завдання: Реалізуйте метод addTask(id, description), який додає нове завдання до менеджера. Якщо завдання з таким ID вже існує, виведіть повідомлення про помилку.
3. Видалення завдання: Реалізуйте метод removeTask(id), який видаляє завдання з менеджера за його ID. Якщо завдання з таким ID не існує, виведіть повідомлення про помилку.
4. Пошук завдання: Реалізуйте метод findTask(id), який повертає опис завдання за його ID або повідомлення про те, що завдання не знайдено.
5. Виведення всіх завдань: Реалізуйте метод displayTasks(), який виводить у консоль усі завдання з їхніми ID та описами.
6. Реалізація функції зміни опису завдання: Додайте метод updateTaskDescription(id, newDescription), який дозволяє змінити опис існуючого завдання. Якщо завдання з таким ID не існує, виведіть повідомлення про помилку.

Додаткові вимоги:

- Для кожного методу використовуйте відповідні методи Map, такі як get(), set(), has(), delete() для управління елементами.
- Забезпечте перехоплення помилок та виведення зрозумілих повідомлень користувачу.
- Продемонструйте використання менеджера завдань, створивши кілька завдань, змінивши опис деяких із них, видаливши завдання та вивівши список усіх завдань.
