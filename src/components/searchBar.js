import React, { useState } from "react";
import "../assets/SearchBar.css";

// OPTIONAL: A simple IPv4 or IPv6 detection. 
// For full IPv6 patterns, you might want a more robust regex.
const isIPv4 = (str) =>
  /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/.test(str);

const isIPv6 = (str) =>
  /^([0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}$/.test(str);

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [ipInfo, setIPInfo] = useState(null);
  const [error, setError] = useState(null);

  const token = "6e7dc0ed534b05"; // <-- replace with your actual token

  // 1. Domain -> IP via Google DNS
  async function getIPFromDomain(domain) {
    try {
      const dnsRes = await fetch(`https://dns.google/resolve?name=${domain}`);
      if (!dnsRes.ok) {
        throw new Error(`DNS resolution failed with status ${dnsRes.status}`);
      }
      const dnsData = await dnsRes.json();
      if (!dnsData.Answer || !Array.isArray(dnsData.Answer)) {
        throw new Error("No valid DNS answer found");
      }

      // Filter A (type=1) or AAAA (type=28) records
      const addresses = dnsData.Answer
        .filter((answer) => answer.type === 1 || answer.type === 28)
        .map((answer) => answer.data);

      if (addresses.length === 0) {
        throw new Error("No A or AAAA records found for domain");
      }

      // Return the first IP
      return addresses[0];
    } catch (err) {
      throw new Error(`Failed to resolve domain: ${err.message}`);
    }
  }

  // 2. Main search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setError(null);
    setIPInfo(null);

    try {
      let ipAddress;

      // Check if query is already an IP (IPv4 or IPv6)
      if (isIPv4(query) || isIPv6(query)) {
        ipAddress = query;
      } else {
        // Otherwise, assume it's a domain & resolve it
        ipAddress = await getIPFromDomain(query);
      }

      // Now fetch ipinfo data with the IP
      const response = await fetch(`https://ipinfo.io/${ipAddress}?token=${token}`);
      if (!response.ok) {
        throw new Error(`ipinfo request failed: ${response.status}`);
      }

      const data = await response.json();

      // We'll attach the original query as "domain" 
      // if the user didn't enter an IP. This is optional.
      if (!isIPv4(query) && !isIPv6(query)) {
        data.domain = query;
      }

      setIPInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "1rem auto", color: "#fcfcfc" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Enter IP or domain..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: "#1f1f1f",
            color: "#fcfcfc",
            border: "1px solid #fcfcfc",
            borderRadius: "4px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "transparent",
            color: "#fcfcfc",
            border: "1px solid #fcfcfc",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {ipInfo && (
        <div style={{ marginTop: "1rem", fontFamily: "monospace" }}>
          <p>
            <strong>IP:</strong> {ipInfo.ip}
          </p>
          <p>
            <strong>Hostname:</strong> {ipInfo.hostname}
          </p>
          <p>
            <strong>City:</strong> {ipInfo.city}
          </p>
          <p>
            <strong>Region:</strong> {ipInfo.region}
          </p>
          <p>
            <strong>Country:</strong> {ipInfo.country}
          </p>
          {/* If domain was found/resolved, show it here */}
          {ipInfo.domain && (
            <p>
              <strong>Domain:</strong> {ipInfo.domain}
            </p>
          )}
          {/* Show org, loc, etc. as needed */}
          {ipInfo.org && (
            <p>
              <strong>Org:</strong> {ipInfo.org}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
