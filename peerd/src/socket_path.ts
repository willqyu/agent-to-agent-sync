// Cross-platform control-socket endpoint resolution.
//
// peerd's control channel is logically a Unix domain socket at a file path
// (`<stateDir>/control.sock`). POSIX (macOS/Linux) binds that path directly.
// Windows' net module can't bind/connect an AF_UNIX *file path* — it expects a
// named pipe under \\.\pipe\. We derive a deterministic pipe name from the file
// path so the daemon (listener) and every client (peer-mcp, CLI, smoke tests)
// independently compute the same endpoint from the same configured path.

export function controlEndpoint(socketPath: string): string {
  if (process.platform === "win32") {
    return "\\\\.\\pipe\\" + socketPath.replace(/[\\/:]/g, "-");
  }
  return socketPath;
}
