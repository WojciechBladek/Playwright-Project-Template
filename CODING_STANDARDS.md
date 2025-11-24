# Introduction to Coding Standards

This guide serves as a reference for our development team, outlining the best
practices and conventions we follow when writing code. Consistent coding
standards not only enhance the readability of our codebase but also promote
collaboration and maintainability.

## Model Names

- Model names should be written in PascalCase.
- Models should be named in a way that clearly reflects their role or content.

**Examples:**

```typescript
// ✅
interface UserModel { ... }
interface OrderDetailsModel { ... }

// ❌
interface userData { ... }
interface data { ... }
```

## Field Initialization in Class Constructor

Only use this template in base class we do not need use this in child class is nice to have.
In the latest version of TypeScript, it is mandatory to initialize all class fields in the constructor. This ensures proper type safety and eliminates potential issues with undefined values.

**Example:**

```typescript
// ✅
class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
  }
}

// ❌
class xyzPage {
  mileageHeaderLabel = this.page.getByText('xyz');
  firstRegistrationDate = this.page.getByText('zyx');

  constructor(private page: Page) {}
}
```

## Locator Names

- Locator names (UI elements) should be written in camelCase.
- Locators should be named in a descriptive manner that clearly indicates what
  they represent.

**Examples:**

```typescript
// ✅
userEmailInput = this.page.getByPlaceholder('Enter User Email');
loginButton = this.page.getByRole('button', { name: 'LogIn' });

// ❌
Btn = this.page.getByPlaceholder('Enter User Email');
el1 = this.page.getByRole('button', { name: 'LogIn' });
```

## Method Names

- Method names should be written in camelCase.
- The method name should follow the format `verbNoun`.
- Method names should be chosen to clearly describe their action or purpose.

**Examples:**

```typescript
// ✅
function getUserData(userId: string): UserData { ... }
function validateUserInput(input: string): boolean { ... }

// ❌
function xyz() { ... }
function check() { ... }
```

## Extracting Expected Values from Assertions

- In assertions, values should be extracted and assigned to variables before use
  in further code.

**Example:**

```typescript
// ✅
expectedValue = 'My expected text';
expect(result).toBe(expectedValue);

// ❌
expect(someFunction()).toBe('My expected text');
```

## AAA (Arrange-Act-Assert)

- Test code should be organized following the AAA principle: Arrange
  (Preparation), Act (Action), Assert (Assertion).
- Preparation is the stage where we set up test data and conditions.
- Action is the stage where we perform the action being tested.
- Assertion is the stage where we check if the action executed correctly.

**Example:**

```typescript
// ✅
test('Some test description', () => {
  // Arrange
  const expectedError = 'xyz';
  const myPage = new myPage();
  const data = prepareData();
  const myPage.customAction(data);

  // Act
  const result = doSomethingWithData(data);

  // Assert
  expect(result).toBe(expectedError);
});
```

## Messages in Assertions

- Avoid using messages in assertions unless it's necessary for test clarity.

**Examples:**

```typescript
// ✅
await expect(page.getByText('Name'), 'User should be logged in').toBeVisible();

// ✅
await expect(page.getByText('Name')).toHaveText(expectedText);
```

## Access Modifiers

- Avoid using explicit access modifiers (e.g., `public`, `private`) in variable
  and method declarations unless it's necessary for implementation

**Example:**

```typescript
// ✅
class MyClass {
  myProperty: string;

  constructor() {
    this.myProperty = 'Hello';
  }

  myMethod() {
    return this.myProperty;
  }
}

// ❌
class MyClass {
  public myProperty: string;

  constructor() {
    this.myProperty = 'Hello';
  }

  public myMethod() {
    return this.myProperty;
  }
}
```

## Returning Page Objects in Page Object Classes

- When creating methods within page object classes that interact with UI
  elements and navigate to other pages, these methods should return new page
  objects representing the navigated pages.
- The method name should clearly describe the action taken, and the return type
  should be the page object class for the new page.

**Examples:**

```typescript
class HomePage {
  // ... other elements and methods ...

  // ✅
  async clickSignInButton(): Promise<SignInPage> {
    // Clicking the sign-in button navigates to the SignInPage.
    await this.signInButton.click();
    return new SignInPage(this.page);
  }

  // ❌
  async clickContactUsButton(): Promise<void> {
    // Clicking the contact us button navigates to the ContactUs page.
    await this.contactUsButton.click();
  }
}
```

Page objects methods usage i.e. in tests:

```typescript
// ✅ using page object returned by method
const signInPage = await homePage.clickSignInButton();

// ❌ creating page object while it can be returned from method
const contactUsPage = new ContactUsPage(page);
await homePage.clickContactUsButton();
contactUsPage.doStuff();
```

## Conditions

- Conditions that have only if and else should be written in a more readable
  form using the ternary operator

**Examples:**

```typescript
// ✅ use of the ternary operator
return accessToken ? `Bearer ${accessToken}` : null;

// ❌ creating an if condition when it can be written in one line
if (accessToken) {
  return `Bearer ${accessToken}`;
} else {
  return null;
}
```

## Arrow Functions

- use the arrow function for simple functions, provide us with better code
  readability\
- don't need to use return keyword

**Examples:**

```typescript
// ✅ use arrow function
export const getRandomValue = (number: number): number =>
  Math.round(Math.random() * number);

// ❌ do not use normal function for a simple method
export function getRandomValue(number: number): number {
  return Math.round(Math.random() * number);
}
```

## Destructuring assignment

- destructuring is a very useful tool that allows you to easily extract values
  from arrays or objects into separate variables
- destructuring allows for more concise and readable retrieval of values from
  objects and arrays.
- We can also use this solution when passing parameters to functions for which
  the interface is created.

## Interfaces in functions:

- Instead of passing multiple parameters to a function, we can do it this way

```typescript
export interface OffersListElement {
  id: string;
  vin: string;
  registrationNumber: string;
  status: string;
}

  async fillAllSearchFields(fields: OffersListElement): Promise<void> {
    await this.tableManagerComponent.searchByOfferIdInput.fill(fields.id);
    await this.tableManagerComponent.searchByRegistrationNumberInput.fill(
      fields.registrationNumber
    );
    await this.tableManagerComponent.searchByVINInput.fill(fields.vin);
  }

        const searchCrossPosTestData = await prepareRandomSearchCrossPosData();

        await searchCrossPosPage.fillAllSearchFields(searchCrossPosTestData);
```

- we can also pass parameters in this form, often useful if we want to change a
  value or do not want to specify certain values

```typescript
export interface OffersListElement {
  id: string;
  vin: string;
  registrationNumber: string;
  status: string;
}
await searchCrossPosPage.fillAllSearchFields({
  status: '',
  id: '',
  vin: '',
  registrationNumber: ''
});
OR;
const { id, status, vin, registrationNumber } =
  await prepareRandomSearchCrossPosData();
await searchCrossPosPage.fillAllSearchFields({
  status: status,
  id: id,
  vin: vin,
  registrationNumber: registrationNumber
});
```

**Examples:**

```typescript
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    zip: string;
  };
}

const person: Person = {
  name: 'John Doe',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001'
  }
};
// ✅ allows us to avoid redundant code
const {
  name,
  age,
  address: { city, zip }
} = person;

// ❌ Instead of creating redundant code it is better to use destructuring
const name = person.name;
const age = person.age;
const city = person.address.city;
const zip = person.address.zip;
```
