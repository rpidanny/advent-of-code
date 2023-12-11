from collections import defaultdict


def get_adjacency_list(input: list[str]) -> dict[str, list[str]]:
    adjacency_list = defaultdict(list)
    for line in input:
        parent, child = line.split(")")
        adjacency_list[parent].append(child)
        adjacency_list[child].append(parent)
    return dict(adjacency_list)


def get_total_orbits(inputs: list[str]) -> int:
    adj_list = get_adjacency_list(inputs)

    stack = [("COM", 0)]
    total_orbits = 0
    visited = set(["COM"])

    while stack:
        node, depth = stack.pop()
        total_orbits += depth

        for child in adj_list[node]:
            if child not in visited:
                visited.add(child)
                stack.append((child, depth + 1))

    return total_orbits


def get_num_of_orbital_transfers(inputs: list[str]) -> int:
    adj_list = get_adjacency_list(inputs)

    stack = [("YOU", 0)]
    visited = set(["YOU"])

    while stack:
        node, depth = stack.pop()

        if node == "SAN":
            return depth - 2

        for child in adj_list[node]:
            if child not in visited:
                stack.append((child, depth + 1))
                visited.add(node)
