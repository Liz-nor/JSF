Tool used: ChatGPT

Date: 15.09.2026
Purpose: Fix product search
Outcome: Identified that filtering and overwriting the original products state caused products to dissapear from later searches

Date: 15.09.2026
Purpose: Improve search behaviour
Outcome: Changed the approach to store the search query separately and derive filtered products from the original product array

Date: 15.09.2026
Purpose: Fix React hooks error
Outcome: Identified that conditonal loading/error returns were occuring before all hooks had excecuted. Moved hooks above conditional returns.

Date: 15.09.2026
Purpose: Debug product grid
Outcome: Checked relationship between currentProducts, filtering, pagination and the grid to determine why fewer products displayed

Date: 15.09.2026
Purpose: Fix HTML/React warning
Outcome: Identified an <li> nested inside another <li> in the navbar and corrected the HTML structure.

Date: 17.09.2026
Purpose: Splitting the fetch from the display of products
Outcome: More organized and shorter files making it easier to identify problems

Date: 19.09.2026
Purpose: Control the hamburger menu
Outcome: Reminder of useState to track whether the mobile navigation is open or closed

Date: 19.09.2026
Purpose: Insert custom content between API products
Outcome: Used the product index to inset a custom banner after a set number of renderen products

Date: 19.09.2026
Purpose: Fix JPG loading as text
Outcome: Identified that images in Vite should either be imported from src/assets or referenced correctly from public

Date: 19.09.2026
Purpose: Continue banners across pagination
Outcome: Used startIndex+index to create a global product index so the banner sequence does not restart on each page

Date: 21.09.2026
Purpose: Adding different text colors to banners
Outcome: Added a textColor propertly to each banner object so individual banner text can have its own Tailwind color

Date: 22.09.2026
Purpose: Fix useLocation() Router error
Outcome: Identified that useLocation waws imported from react-router-dom while the project uses Tanstack Router. Changed the import to @tanstack/react-router

Date: 24.09.2026
Purpose: Find a font complementing Manrope
Outcome: Compared suitable font pairings and identified options such as Playfair Display DM Serif Display and more. Landed on Playfair in the end for headings

Date: 24.09.2026
Purpose:
Outcome:

Date: 24.09.2026
Purpose:
Outcome:
