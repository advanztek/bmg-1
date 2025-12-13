import { Box } from "@mui/material";
import Resources from "../../../Component/Resources";
import SingleResourcePage from "../../../Component/SingleResource";
import { useState } from "react";

const ResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <Box>
      {selectedResource ? (
        <SingleResourcePage
          resource={selectedResource}
          onBack={() => setSelectedResource(null)}
        />
      ) : (
        <Resources onSelectResource={setSelectedResource} />
      )}
    </Box>
  );
};

export default ResourcesPage;