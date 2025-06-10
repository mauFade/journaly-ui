import React, { use } from "react";
import JournalPageDetail from "./components/journal-page";

const JournalIdPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <JournalPageDetail id={id} />;
};

export default JournalIdPage;
