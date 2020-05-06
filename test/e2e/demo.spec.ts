import * as puppeteer from "puppeteer";

// import aurelia configuration in order to have access to the defined host and port
import * as project from '../../aurelia_project/aurelia.json';

describe("starting the app", () => {
  async function arrange() {
    // launch puppeteer
    const browser = await puppeteer.launch({
      // note that the npm script puppeteer-headless passes on a HEADLESS env var we're checking here for
      headless: process.env?.HEADLESS === "true",
      defaultViewport: {
        width: 1280,
        height: 780
      }
    });

    // create a new page
    const page = await browser.newPage();

    // go to our app using the defined host and port from the aurelia config
    await page.goto(`http://${project.platform.host}:${project.platform.port}`);

    return {
      browser,
      page
    };
  }
  
  // all puppeteer actions are async
  it("should start with the welcome page", async () => {
    const { browser, page } = await arrange();

    // check the textContent of the h2
    expect(await page.$eval("h2", (el) => el.textContent)).toBe("Welcome to the Aurelia Navigation App!");

    // close the browser. If the test fails this won't be executed and thus the browser stays open
    // if you need a proper cleanup wrap the test in a try/catch and perform the next line in the finally block
    await browser.close();
  });

  fit("should show github users when switching to the respective tab", async () => {
    jest.setTimeout(50000);
    const { browser, page } = await arrange();
    const SEL_githubUsersNavbarLink = ".navbar-nav li:nth-child(2)";
    const SEL_githubProfiles = ".user-card-container";

    // to improve stability of your tests make sure to wait for elements before interacting with them
    await page.waitForSelector(SEL_githubUsersNavbarLink);
    // click on the second menu item
    await page.click(SEL_githubUsersNavbarLink);

    // wait for the github request to finish
    await page.waitForResponse("https://api.github.com/users");
    
    // wait for profiles to be rendered
    await page.waitForSelector(SEL_githubProfiles);

    // check that 30 of them are rendered
    expect((await page.$$(SEL_githubProfiles)).length).toBe(30);

    // same as above
    await browser.close();
  });
});
