// https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest

import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });
