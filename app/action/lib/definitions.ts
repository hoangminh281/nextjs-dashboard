export type StateErrorType = {
    name?: string[];
    class?: string[];
    pronunciation?: string[];
    definition?: string[];
    example?: string[];
    opposite?: string[];
    image?: string[];
  }

export type StateType = {
    errors?: StateErrorType;
    message?: string | null;
  };
  