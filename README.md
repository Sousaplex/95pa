# 95 Prince Arthur Survey

A Next.js-based website for collecting feedback from residents and owners at 95 Prince Arthur Ave in Toronto. Created by Michael Sousa for his condo board candidacy.

## About This Project

This is a campaign website for Michael Sousa, who is running for the condo board at 95 Prince Arthur Avenue in Toronto. The website highlights Michael's personal connection to the building as his parents purchased their unit in 1986, and he was born in 1988. As co-founder of SingleKey (a company helping landlords and tenants) and with experience serving on multiple boards, he brings valuable expertise to the role.

The website demonstrates Michael's commitment to transparency and his concern about stalled projects like the rooftop renovation. Its goal is to collect anonymous feedback from residents to guide improvement priorities and ensure responsible financial management.

## Key Features

- **Anonymous Surveys**: Gather feedback without requiring personal information
- **Multiple Survey Categories**: Collect input on amenities, security, maintenance, and community events
- **Admin Dashboard**: Password-protected area to view survey results
- **Mobile-Friendly**: Works well on phones, tablets and desktops

## Tech Stack

- **Frontend**: Next.js with React and Tailwind CSS
- **API Routes**: Simple Next.js API endpoints
- **Storage**: In-memory storage (would use Vercel KV for production)

## Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/95-prince-arthur-survey.git
   cd 95-prince-arthur-survey
   ```

2. Install dependencies and run
   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project can be easily deployed on Vercel:

1. Push to GitHub
2. Import in Vercel
3. Deploy

## Admin Access

For testing purposes, the admin dashboard is accessible at `/admin` with password: `prince95arthur`

## Candidate Platform

Michael's platform focuses on:

- Ensuring money is spent responsibly to protect property values
- Improving project management and delivery
- Increasing transparency with all unitholders
- Addressing stalled initiatives like the rooftop project
- Creating better communication with residents

## Future Enhancements

- Integration with a proper database (Vercel KV or Postgres)
- Data visualization for survey results
- Export functionality for survey data
- Email notifications for new survey submissions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
