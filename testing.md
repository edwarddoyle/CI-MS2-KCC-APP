## Testing

JavaScript function testing can be found in the [JavaScript Test Results Document](assets/docs/FunctionTests.pdf)
As DRY functions are imported across the entire application - they are tested within the scope they are executed, ie. a noData() function is called when there is no data to display in events.js & reports.js. Testing of this function was carried out within these scopes and not where the function is declared

>The following devices / browsers were used by me for testing. Friends & family used a variety of devices to view / test the site.
>
>* Desktop
>   * Firefox 82
>   * Chrome 87
>   * Edge 87
>* Android
>   * Chrome 87
>   * Chrome Dev 88
>   * Chrome Canary 89
>   * Firefox 84
>   * DDG 5.72
>* iOS
>   * Safari 13
>   * Safari 14
>   * Safari 15
>
>I also used [LambdaTest](https://www.lambdatest.com/) to simulate cross browser Testing
>
> Testing was seperated into 3 categories; user testing, functional testing & performance testing

### User Testing

Testing was carried out on the site using the following parameters:
UX & Navigation, Responsiveness, Accessibility, Scope / Goals and Validation.

#### UX & Navigation

| Success Criteria                     | Test Method                                                  | Result                    | Comment                                   | Solution                                 |
| :----------------------------------- | ------------------------------------------------------------ | ------------------------- | ----------------------------------------- | ---------------------------------------- |
| All links navigate to correct target | Manual checking of links                                     | PASS                      | -                                         |                                          |
| External site links open in new tab  | Manual checking of links                                     | PASS                      | -                                         |                                          |
| Website is easy to navigate          | Friends & family visited the website and reported any potential navigation issues | PASS |  | |

#### Responsiveness

| Success Criteria                                             | Test Method                                                  | Result | Comment              | Solution                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | -------------------- | ------------------------------------------------------------ |
| Website content displays appropriately across multiple browsers. Images scale correctly, Containers wrap correctly, Fonts scale correctly | Manual testing on multiple devices and browsers. Friends & family visited the website and reported any potential responsiveness issues.Manual testing on multiple devices and browsers.  Also used [LambdaTest](https://www.lambdatest.com/) & [Google Mobile Friendly Test](https://search.google.com/test/mobile-friendly) | PASS   | | |

#### Accessibility

| Success Criteria            | Test Method                                                  | Result | Comment                                                      | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Colour Contrast             | Colours checked on [Color a11y](https://color.a11y.com/Contrast/) | PASS   | Greeting drop down contained low contrast                 | Updated greeting CSS                                    |
| Readability                 | Friends & family visited the website and reported any potential readability issues. Website content checked for spelling and grammar issues, MS Word | PASS   | Justify text, although looked visually appealing made the text blocks difficult to read | Update text justification to accommodate testers recommendations |
| Overall accessibility tests | Tested on [Wave](https://wave.webaim.org/) Accessiblity testing |      PASS  |   Issues reported with aria descriptions                                                           |  Fixed by applying a11y solution found  [here](https://medium.com/@svinkle/why-let-someone-know-when-a-link-opens-a-new-window-8699d20ed3b1)                                                     |

#### Scope / Goals

| Success Criteria                                             | Test Method                                                  | Result | Comment                                                      | Solution |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | -------- |
| Form controls: Required form controls in place               | Manual Testing                                               | PASS   | -                                                            | -        |
| Colour scheme matches client’s requirements                  | Client Testing                                               | PASS   | -                                                            | -        |
| The website language and message matches what the client requested | Client proof read the content                                | PASS   | -                                                            | -        |
| User stories fulfilled                                       | Family and friends visited the website and provided feedback. | PASS   | -                                                            | -        |
| Overall Client Satisfaction                                  | Client Feedback                                              | PASS   | The client is happy with the initial deployment and is waiting on feedback from users | -        |

#### Validation

| Success Criteria     | Test Method                                              | Result | Comment | Solution |
| -------------------- | -------------------------------------------------------- | ------ | ------- | -------- |
| HTML code validation | [W3C HTML Validator](https://validator.w3.org)           | PASS   | -       | -        |
| CSS code validation  | [W3C CSS Validator](https://jigsaw.w3.org/css-validator) | PASS   | Issues with vendor prefixes in 3rd party stylesheets (sliderJS)     | removed during second test       |

### Functional Testing

#### Navbar

| Success Criteria                                    | Method                                                 | Result | Device           |
| --------------------------------------------------- | ------------------------------------------------------ | ------ | ---------------- |
| Navbar fixed to top of browser (desktop) & bottom of browser (mobile)  across all sections | Scroll, navigate through website                       | PASS   | Desktop & Mobile |
| Navbar links change colour size  when hover         | Mouse hovered over links                               | PASS   | Desktop          |
| Navbar links navigate to the  relevant page section | Each link clicked                                      | PASS   | Desktop & Mobile |

#### Home Section

| Success Criteria                        | Method      | Result | Device           |
| --------------------------------------- | ----------- | ------ | ---------------- |
| Greeting is customised if returning user | Fill out contact form and revisit page | PASS   | Desktop & Mobile |

#### Events Section

| Success Criteria                        | Method            | Result | Device            |
| --------------------------------------- | ----------------- | ------ | ----------------- |
| No events image when no data | delete JSON file      | PASS   | Desktop &  Mobile |
| Event cards expand and collapse         | Click event cards | PASS   | Desktop &  Mobile |

#### Report Section

| Success Criteria | Method | Result | Device |  
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ----------------- |
| Report pop displays  | cta button clicked                                           | PASS   | Desktop &  Mobile |
 | Browser requests location permission  | cta button clicked                                           | PASS   | Desktop &  Mobile |
| Users location displayed on map                                         | Location permission granted to browser                                           | PASS   | Desktop &  Mobile |
| Image button opens file browser on desktop & option of file browser or camera on mobile                                | image upload button clicked                                         | PASS   | Desktop &  Mobile |
| Images display in slider                                         | Tested uploading from file system on both desktop & mobile. Live captured images from camera                 | PASS      | Desktop & Mobile                |
| Report Sent to Admin              | Check email account & api dashboard                    | PASS   | Desktop &  Mobile |
| Previous Reports should be displayed or no reports image if no reports posted previously            | No reports image shows on initial navigation to the page. Post a report                    | PASS   | Desktop &  Mobile |

#### Contact Section

| Success Criteria | Method | Result | Device |  
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ----------------- |
| Feedback link opens pop up  | Feedback link clicked                                           | PASS   | Desktop &  Mobile |
 | Phone link opens App  | Phone link clicked                                           | PASS   | Desktop &  Mobile |
| Email link opens App                                         | Email link clicked                                           | PASS   | Desktop &  Mobile |
| Social links open in new tab                                 | Social links clicked                                         | PASS   | Desktop &  Mobile |
| Contact Form Tests                                           | -                                                            | -      | -                 |
| Name field required; form should  issue warning              | Leave name field blank and click  submit                     | PASS   | Desktop &  Mobile |
| Email field required; form should  issue warning             | Leave email field blank and click  submit                    | PASS   | Desktop &  Mobile |
| Email must be in email format, ie.  Contain @ symbol and domain address | Enter email without @ symbol, Enter email with @ symbol without domain | PASS   | Desktop &  Mobile | | Radio button highlights                                      | Check radio button                                           | PASS   | Desktop &  Mobile |
| Feedback icons change when clicked | click all feedback radio inputs | PASS   | Desktop &  Mobile |

### Performance Testing

Performance testing was carried out using GTmetrix & Lighthouse. The initial results were very impressive but there were areas for improvement. Full test results are available to view in the [Performance & Accessibility Test Result Document](assets/docs/Tests.pdf). The biggest performance inhibitor is related to a 3rd party library - [Swiper JS](https://swiperjs.com/). I am currently researching Vanilla Javascript solutions for providing the same functionality as this library.

### Open issues

Some minor issues in regards to ARIA and a11y are present throughout the site. I aim to have these issues fixed once my knowledge and skills improve. Results of a11y testing can be found in the [Performance & Accessibility Test Result Document](assets/docs/Tests.pdf). I am waiting for feedback from users to identify further areas for improvement.
