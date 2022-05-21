import { useContext, useEffect } from "react";

import { getJBController } from "juice-sdk";
import { JuiceContext } from "contexts/JuiceContext";
import useHookState from "hooks/useHookState";
import { FundingCycleData, FundingCycleMetadata } from "types/fundingCycle";

type DataType = {
  fundingCycleData: FundingCycleData;
  fundingCycleMetadata: FundingCycleMetadata;
};

export default function useProjectCurrentFundingCycle({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const { loading, data, error, actions } = useHookState<DataType>();

  useEffect(() => {
    actions.setLoading(true);

    getJBController(provider)
      .currentFundingCycleOf(projectId)
      .then((data) => {
        actions.setLoading(false);
        actions.setData({
          fundingCycleData: data?.[0],
          fundingCycleMetadata: data?.[1],
        });
      })
      .catch((e) => {
        actions.setError(e);
      });
  }, [projectId]);

  return { loading, data, error };
}
