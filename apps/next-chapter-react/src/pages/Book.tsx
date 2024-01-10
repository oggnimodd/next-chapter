import { FC } from "react";
import { BaseLayout } from "layouts";
import { useBookDetails, useRouteMatch } from "hooks";
import { Tab, Tabs } from "@mui/material";
import { BookDetails, BookNotes, BookReview, TabPanel } from "components";
import { Link, useParams } from "react-router-dom";
import { tabA11y } from "utils";

const Book: FC = () => {
  const { id } = useParams();

  const tabs = [
    {
      label: "Details",
      to: `/book/${id}/details`,
      value: "/book/:id/details",
      component: BookDetails,
    },
    {
      label: "Notes",
      to: `/book/${id}/notes`,
      value: "/book/:id/notes",
      component: BookNotes,
    },
    {
      label: "Review",
      to: `/book/${id}/review`,
      value: "/book/:id/review",
      component: BookReview,
    },
  ];

  const { isError, isLoading, data: googleBooksDetails } = useBookDetails();
  const routeMatch = useRouteMatch(tabs.map(({ value }) => value));
  const currentTab = routeMatch?.pattern?.path;

  return (
    <BaseLayout>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isLoading && !isError && (
        <div className="flex flex-col relative">
          <h1 className="text-2xl text-primary-main">
            {googleBooksDetails?.volumeInfo?.title || ""}
          </h1>
          <div className="sticky top-0 bg-background-default z-50">
            <Tabs value={currentTab} aria-label="Book Tabs">
              {tabs.map((tab) => (
                <Tab
                  key={tab.label}
                  label={tab.label}
                  value={tab.value}
                  to={tab.to}
                  component={Link}
                  {...tabA11y({
                    index: tabs.indexOf(tab),
                    name: "book",
                  })}
                />
              ))}
            </Tabs>
          </div>
          <div className="mt-4">
            {tabs.map((tab) => {
              return (
                <TabPanel
                  name="book"
                  key={tab.label}
                  index={tabs.indexOf(tab)}
                  hidden={tab.value !== currentTab}
                >
                  <tab.component />
                </TabPanel>
              );
            })}
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Book;
