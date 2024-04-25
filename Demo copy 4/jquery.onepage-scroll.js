const chaptersData = [
  {
      title: "Chapter 1: Introduction",
      pages: [
          {
              title: "CONSTRUCTIVE DESIGN RESEARCH",
              content: "This is the content of page 1 of Chapter 1..."
          },
          {
              title: "Page 2",
              content: "This is the content of page 2 of Chapter 1."
          },
          {
              title: "Page 3",
              content: "This is the content of page 3 of Chapter 1."
          }
      ]
  },
  {
      title: "Chapter 2: Chapter Two",
      pages: [
          {
              title: "Page 1",
              content: "This is the content of page 1 of Chapter 2."
          },
          {
              title: "Page 2",
              content: "This is the content of page 2 of Chapter 2."
          },
          {
              title: "Page 3",
              content: "This is the content of page 3 of Chapter 2."
          }
      ]
  }
  // Add more chapters as needed
];

let currentChapterIndex = 0;
let currentPageIndex = 0;

function displayPage(chapterIndex, pageIndex) {
  const chapter = chaptersData[chapterIndex];
  const page = chapter.pages[pageIndex];
  const bookContainer = document.getElementById("book-container");

  // Clear the book container
  bookContainer.innerHTML = "";

  // Create a new chapter element for the first page of each chapter
  const chapterElement = document.createElement("div");
  chapterElement.classList.add("section");
  chapterElement.innerHTML = `<h2>${chapter.title}</h2>`;
  bookContainer.appendChild(chapterElement);

  // Create the page element with initial opacity set to 0
  const pageElement = document.createElement("div");
  pageElement.classList.add("page");
  pageElement.innerHTML = `<h3>${page.title}</h3><p>${page.content}</p>`;
  pageElement.style.opacity = 0;

  // Append the page to the book container
  bookContainer.appendChild(pageElement);

  // Adding a class to trigger CSS animations and fade in the page
  setTimeout(() => {
      pageElement.classList.add("active");
  }, 100); // Adding a slight delay to ensure the class is added after the page is appended

  // Ensure opacity is set to 1 after animation completes
  setTimeout(() => {
      pageElement.style.opacity = 1;
  }, 1100); // Set opacity to 1 after 1 second (adjust as needed based on animation duration)
}


function moveToNextSection() {
  if (currentChapterIndex < chaptersData.length) {
      const nextPageIndex = currentPageIndex + 1;

      if (chaptersData[currentChapterIndex].pages) {
          if (nextPageIndex >= chaptersData[currentChapterIndex].pages.length) {
              currentChapterIndex++;
              currentPageIndex = 0;
          } else {
              currentPageIndex = nextPageIndex;
          }

          // Display the new page
          displayPage(currentChapterIndex, currentPageIndex);
      } else {
          console.error("No pages found in the current chapter.");
      }
  } else {
      console.error("No more chapters found.");
  }
}

document.addEventListener("keydown", function(event) {
  switch(event.keyCode) {
      case 40: // Down arrow
          moveToNextSection();
          break;
      case 38: // Up arrow
          moveToPreviousSection();
          break;
  }
});

function moveToPreviousSection() {
  if (currentPageIndex > 0) {
      currentPageIndex--;
      displayPage(currentChapterIndex, currentPageIndex);
  } else if (currentChapterIndex > 0) {
      currentChapterIndex--;
      currentPageIndex = chaptersData[currentChapterIndex].pages.length - 1;
      displayPage(currentChapterIndex, currentPageIndex);
  } else {
      console.error("No previous chapters or pages found.");
  }
}


// Initial display
displayPage(currentChapterIndex, currentPageIndex);