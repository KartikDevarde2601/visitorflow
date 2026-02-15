# Track Plan: Core CRUD Modules (User, Visitor, Visit)

This plan outlines the steps to implement the core business logic and REST APIs for the VisitorFlow system, following a Test-Driven Development (TDD) approach.

## Phase 1: Setup & User Module Implementation

- [x] Task: Project Setup and Validation Configuration 40f686a
    - [ ] Subtask: Install `class-validator` and `class-transformer` in `apps/visitorflow-api`.
    - [ ] Subtask: Configure global `ValidationPipe` in `main.ts`.
- [ ] Task: Implement User Module CRUD
    - [ ] Subtask: Use NestJS CLI to generate `Users` module, service, and controller.
    - [ ] Subtask: Create `CreateUserDto` and `UpdateUserDto` with validation decorators.
    - [ ] Subtask: Write failing unit tests for `UsersService` (Create, FindAll, FindOne, Update, Delete).
    - [ ] Subtask: Implement `UsersService` logic using the `User` repository.
    - [ ] Subtask: Write failing unit tests for `UsersController`.
    - [ ] Subtask: Implement `UsersController` endpoints.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup & User Module Implementation' (Protocol in workflow.md)

## Phase 2: Visitor Module Implementation

- [ ] Task: Implement Visitor Module CRUD
    - [ ] Subtask: Use NestJS CLI to generate `Visitors` module, service, and controller.
    - [ ] Subtask: Create `CreateVisitorDto` and `UpdateVisitorDto`.
    - [ ] Subtask: Write failing unit tests for `VisitorsService` (Create, FindByPhone, List, Update).
    - [ ] Subtask: Implement `VisitorsService` logic.
    - [ ] Subtask: Write failing unit tests for `VisitorsController`.
    - [ ] Subtask: Implement `VisitorsController` endpoints.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Visitor Module Implementation' (Protocol in workflow.md)

## Phase 3: Visit Module Implementation

- [ ] Task: Implement Visit Module CRUD & Status Transitions
    - [ ] Subtask: Use NestJS CLI to generate `Visits` module, service, and controller.
    - [ ] Subtask: Create `CreateVisitDto` and `UpdateVisitStatusDto`.
    - [ ] Subtask: Write failing unit tests for `VisitsService` (Create Request, Approve/Reject logic, Entry/Exit timestamping).
    - [ ] Subtask: Implement `VisitsService` logic, ensuring relations (Visitor, Host, Guard) are loaded.
    - [ ] Subtask: Write failing unit tests for `VisitsController`.
    - [ ] Subtask: Implement `VisitsController` endpoints including specialized status and entry/exit actions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Visit Module Implementation' (Protocol in workflow.md)

## Phase 4: Final Integration & Verification

- [ ] Task: End-to-End Workflow Verification
    - [ ] Subtask: Verify full flow: User creation -> Visitor registration -> Visit request -> Approval -> Entry scan.
    - [ ] Subtask: Ensure code coverage meets the >80% requirement for all new modules.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Integration & Verification' (Protocol in workflow.md)
