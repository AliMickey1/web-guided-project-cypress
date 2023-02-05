// write tests here
describe("Quotes App", () => {
    beforeEach (() => {
//Each test needs fresh state; 
// tests shouldn't rely on other tests; 
// every test should work in isolation; refreshes after each test
        cy.visit("http://localhost:1234");
    })

//Helpers (ie GETTERS)
const textInput = () => cy.get("input[name=text]");
const authorInput = () => cy.get("input[name=author]");

const foobarInput = () => cy.get("input[name=foobar]");
const submitBtn = () => cy.get(`button[id="submitBtn"]`);
const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

//each test starts with "it"

it("sanity check to make sure test work", () => {
    //"it is a test"
    // "expect" is an assertion
    // There can be multiple assertions per test, but they all need to relate to "one thing" that we're doing

    expect(1 + 2).to.equal(3);
    expect(2+2).not.equal(5); //strict === vs ==!! === strict, does NOT do type coercion
    // 1 !== "1" =="1" ALWAYS use ===
    expect({}).not.to.equal({}); //Is this true?
    expect({}).to.eql({}); //==
})

it("the proper elements are showing", () => {
    textInput().should("exist");
    authorInput().should("exist");
    foobarInput().should("not.exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");

    cy.contains("Submit Quote").should("exist");
    cy.contains(/submit quote/i).should("exist");
})

describe("Filling out the inputs and cancelling", () => {
    it("can navigate to the site", () => {
        cy.url().should("include", "localhost");

    })
    it("submit button starts out disabled", () => {
        submitBtn().should("be.disabled");
    })

    it("can type in the inputs", () => {
        textInput()
        .should("have.value", "")
        .type("CSS rulez")
        .should("have.value", "CSS rulez");

        authorInput()
        .should("have.value", "")
        .type("CRHarding")
        .should("have.value", "CRHarding");

    })

    it("the submit button enables when both inputs are filled out", () => {
        authorInput().type("Ali");
        textInput().type("This is fun!");
        submitBtn().should("not.be.disabled");
    })

    it("the cancel button can reset the inputs and disable the submit button", () => {
        authorInput().type("Ali");
        textInput().type("FUN");
        cancelBtn().click();
        textInput().should("have.value", "");
        authorInput().should("have.value", "");
        submitBtn().should("be.disabled");
    })
})


describe("Adding a new quote", () => {
    it("can submit and delete a new quote", () => {
        textInput().type("CSS rulez");
        authorInput().type("Ali");
        submitBtn().click();
        //it's import that state is the same at the beginning of each test
        // we need to ensure we immediately delete the new post (when using testing database IRL)
        // worst case, restart the server script (ctrl c)

        cy.contains("CSS rulez").siblings("button:nth-of-type(2)").click();
        cy.contains("Css rulez").should("not.exist");

    })

    it("variation of can submit a new quote", () => {
        cy.contains("CSS rulez").should("not.exist");
        textInput().type("CSS rulez");
        authorInput().type("Ali");
        submitBtn().click();
        cy.contains("CSS rulez");
        cy.contains("Ali");
        cy.contains("CSS rulez").next().next().click();
        cy.contains("Css rulez").should("not.exist");
    })



})

describe("Editing an existing quote", () => {
    it("can edit a quote", () => {
        textInput().type("Lorem ipsum");
        authorInput().type("Ali");
        submitBtn().click();
        cy.contains("Lorem ipsum").siblings("button:nth-of-type(1)").click();
        textInput().should("have.value", "Lorem ipsum");
        authorInput().should("have.value", "Ali");
        textInput().type(" dolor sit");
        authorInput().type(" ROCKS");
        submitBtn().click();
        cy.contains("Lorem ipsum dolor sit (Ali ROCKS)");
        // Gotta hit that delete button
        cy.contains("Lorem ipsum dolor sit (Ali ROCKS)").next().next().click();
        cy.contains("Lorem ipsum dolor sit (Ali ROCKS)").should("not.exist");
    })
})











})