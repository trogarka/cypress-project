Currently, we are using object literals in the project, which are disadvantageous in many ways. The goal is to refactor these object literals into full-fledged page objects.

Contribution:
Inheritance: Share common selectors/actions via base classes.
Encapsulation: Hide internal details, expose only necessary methods.
TypeScript support: Better type safety, autocompletion, and refactoring.
Scalability: Easier to extend and organize as your suite grows.

Procedure:
Creating new pageobjects with best practices for automated testing in mind. Gradually replacing old object literals with new classes.