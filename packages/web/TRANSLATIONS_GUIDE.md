# The full guide for Translations on Ferman

---

### How to add new translations

1. Create a new folder under public/locales with the name of the locale you want to add.
2. Then, add a file named "translation.json" under the folder you created.
3. To synchronize the new file and add all the translation keys automatically run "yarn i18" in the web directory.
4. Finally, translate all the keys to the language you selected.
5. When you have finished the translation make a merge request. I or some moderator will review it and if everything is ok, it will be pushed to production.

### What to translate and what not.

- **Do not** translate words surrounded by percentage symbols (%). These are varibles that are going to be replaced with a username or something from the server.
- **Do** translate words surrounded by @ symbols. These will be displayed as links to the user. Translate them as you would on any other word, just don't remove the @ symbols.

### Respect the format

Please, respect the capitalization, commas, dots, etc.
